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
  name: string;
  plan: string;
}
const SingUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null); // permite nos manipulação direta com o form
  const navitagion = useNavigation();
  const nameInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFromData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatorio'),
          plan: Yup.string().min(4, 'No mínmo 4 digitos'),
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

            <View>
              <Title>Crie seu login</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                ref={nameInputRef}
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  nameInputRef.current?.focus();
                }}
              />

              <Input
                name="password"
                icon="lock"
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Plano"
                secureTextEntry
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
              Finalizar cadastro
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn
        onPress={() => {
          navitagion.goBack();
        }}
      >
        <Icon name="arrow-left" size={20} color="#53b29d" />
        <BackToSignInText>Volta para logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SingUp;
