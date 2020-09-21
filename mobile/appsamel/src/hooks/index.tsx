import React from 'react';

/** center import from hooks  */
import { AuthProvider } from './auth';

//* global provaider */
const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;
