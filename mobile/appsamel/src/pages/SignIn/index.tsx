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
  name: string;
  plan: string;
}
const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const planUesRef = useRef<TextInput>(null);

  const { signIn } = useAuth();

  const HandleSignIn = useCallback(
    async (data: SingInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Required Full Name'),
          plan: Yup.string().required('Required Plan'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          name: data.name,
          plan: data.plan,
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Faça seu logon</Title>
            </View>
            <Form ref={formRef} onSubmit={HandleSignIn}>
              <Input
                autoCorrect={false} // desabilitando auto correção do keyboard
                autoCapitalize="none" // desabilita Letra maiscula
                keyboardType="default" // tipo de teclado
                name="name"
                icon="user"
                placeholder="Nome Completo"
                returnKeyType="next"
                // manipula o elemento diretamente usase as ref
                onSubmitEditing={() => {
                  planUesRef.current?.focus();
                }}
              />
              <Input
                ref={planUesRef}
                name="plan"
                icon="lock"
                placeholder="plano"
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
              <ForgotPasswordText>Esqueci minha meu plano</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#53b29d" />
        <CreateAccountButtonText>Cria seu login</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
