import React, { useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Image,
  Platform,
  TextInput,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import GetvalidationErros from '../../utils/getValidationErros';
import api from '../../service/api';
import Input from '../../components/input';
import Button from '../../components/button';
import logoImg from '../../assets/logo.png';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

interface SignUpFromData {
  email: string;
  password: string;
}
const SingUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null); // permite nos manipulação direta com o form
  const navitagion = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const passsowrdInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);
  const planInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFromData) => {
      /* function Validation */
      try {
        /** zera os erros */
        formRef.current?.setErrors({});

        /** schema de validação - criamos quando vamos falida uum objeto inteiro */
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatorio'),
          email: Yup.string()
            .required('E-mail obrigatorio')
            .email('Digite seu E-mail'),
          password: Yup.string().min(6, 'No mínmo 6 digitos'),
        });
        await schema.validate(data, {
          abortEarly: false, // retorna todos os erros juntos.
        });

        // adb reverse tcp:3333 tcp:3333 aplica para utiliza no device
        await api.post('/users', data);

        Alert.alert(
          'Cadastor realizado com sucesso !',
          'Você já pode fazer login na aplicação',
        );

        navitagion.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = GetvalidationErros(err);

          formRef.current?.setErrors(erros);
          return;
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer login, tente novamente',
        );
      }
    },
    [navitagion],
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
              <Title>Crie sua conta</Title>
            </View>
            {/* ** */}
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                ref={emailInputRef}
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              {/* passando algumas propriedades */}
              <Input
                ref={phoneInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  phoneInputRef.current?.focus();
                }}
              />
              <Input
                ref={planInputRef}
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                name="plan"
                icon="phone"
                placeholder="Telefone"
                returnKeyType="next"
                onSubmitEditing={() => {
                  planInputRef.current?.focus();
                }}
              />
              <Input
                ref={passsowrdInputRef}
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                name="plan"
                icon="clipboard"
                placeholder="Plano"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passsowrdInputRef.current?.focus();
                }}
              />
              {/* passando algums propriedades */}
              <Input
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="senha"
                textContentType="newPassword" // não gera senha automatica
                returnKeyType="send"
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
              Cadastrar
            </Button>
            {/* ** */}
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn
        onPress={() => {
          navitagion.goBack();
        }}
      >
        <Icon name="arrow-left" size={20} color="#ffff" />
        <BackToSignInText>Volta para logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SingUp;
