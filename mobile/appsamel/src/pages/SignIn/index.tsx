import React, { useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Image,
  Platform,
  TextInput,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useAuth } from '../../hooks/auth';

import GetvalidationErros from '../../utils/getValidationErros';

import Input from '../../components/input';
import Button from '../../components/button';

import logoImg from '../../assets/logo.png';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

interface SingInFormData {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null); // permite nos manipulação direta com o form
  const navigation = useNavigation(); // faz o roteamento entre as telas
  const passswordUesRef = useRef<TextInput>(null);

  const { signIn } = useAuth();

  /**
   * ref -> sçoa formas de manipular e acessar propriedade e funções, de um elem
   * ento de uma forma mas direta sem que agente preciesse que um elemento acontessa
   */
  const HandleSignIn = useCallback(
    async (data: SingInFormData) => {
      /* function Validation */
      try {
        /** zera os erros */
        formRef.current?.setErrors({});

        /** schema de validação - criamos quando vamos valida uum objeto inteiro */
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Required E-mail ')
            .email('Digite seu E-mail'),
          password: Yup.string().required('Required Password'),
        });

        await schema.validate(data, {
          abortEarly: false, // retorna todos os erros juntos.
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        // history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = GetvalidationErros(err);

          formRef.current?.setErrors(erros);

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifice suas credencias',
        );
      }
    },
    [signIn],
  );

  return (
    <>
      {/* Evita mostra o teclado por cima  /** */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled" // faz o fecha o teclado , quando click flora da scroll
          contentContainerStyle={{ flex: 1 }} // ocupa o maximo de espaco
        >
          <Container>
            <Image source={logoImg} />
            {/* text in react-native can't does of the animations for resolve this 
          we use View */}
            <View>
              <Title>Faça seu logon</Title>
            </View>
            <Form ref={formRef} onSubmit={HandleSignIn}>
              {/* passando algumas propriedades */}
              <Input
                autoCorrect={false} // desabilitando auto correção do keyboard
                autoCapitalize="none" // desabilita Letra maiscula
                keyboardType="email-address" // tipo de teclado
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                // manipula o elemento diretamente usase as ref
                onSubmitEditing={() => {
                  passswordUesRef.current?.focus();
                }}
              />
              {/* passando algums propriedades */}
              <Input
                // e a unica que não conseguimos acessa como um propriedade do elemento
                ref={passswordUesRef}
                name="password"
                icon="lock"
                placeholder="senha"
                secureTextEntry // deixa o texto como boilhas
                returnKeyType="send" // muda o tipo do button no kyboard
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </Form>

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Entrar
            </Button>

            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#53b29d" />
        <CreateAccountButtonText>Cria uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
