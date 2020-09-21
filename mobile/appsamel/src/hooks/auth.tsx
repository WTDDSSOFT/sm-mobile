import React, {
  useEffect,
  createContext,
  useCallback,
  useState,
  useContext,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import api from '../service/api';

interface AuthState {
  token: string;
  user: object;
}
interface signInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: object;
  loading: boolean;
  signIn(credentials: signInCredentials): Promise<void>;
  signOut(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadStoregeData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@AppSamel:token',
        '@AppSamel:user',
      ]);

      if (token[1] && user[1]) {
        setData({
          token: token[1],
          user: JSON.parse(user[1]),
        });
      }
      setLoading(false);
    }
    loadStoregeData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    AsyncStorage.multiSet([
      ['@AppSamel:token', token],
      ['@AppSamel:user', JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@AppSamel:token', '@AppSamel:user']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within and AuthProvider');
  }

  return context;
}
export { AuthProvider, useAuth };
