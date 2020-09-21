import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { Container, ButtonText } from './styles';

/** propriedades */
interface ButtonProps extends RectButtonProperties {
  children: string;
}
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  // pegando todas as props que não sao children, ou seja passando todas as outros
  // propriedades
  <Container {...rest}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

export default Button;
