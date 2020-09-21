import styled, { css } from 'styled-components/native';

import FeahterIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isError: boolean;
}
export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #53b29d;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #7da1bf;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isError &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #4db7ad;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #232129;
  font-size: 16px;
  font-family: 'Roboto-Medium';
`;

export const Icon = styled(FeahterIcon)`
  margin-right: 16px;
`;
