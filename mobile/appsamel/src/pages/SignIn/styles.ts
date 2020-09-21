import styled from 'styled-components/native';
import { Platform } from 'react-native';
// not has encadeamento of styles

export const Container = styled.View`
  flex: 1; /** faz ocupa todo o display. */
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px; /**distanciamento das laterais */
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #232129;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #232129;
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  /* deixa o botton on buttom */

  position: absolute;
  /**make in bottom */
  left: 0;
  bottom: 0;
  right: 0;
  background: #ffffff;
  border-top-width: 1px;
  border-color: #53b29d;
  padding: 16px 0;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  color: #53b29d;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
