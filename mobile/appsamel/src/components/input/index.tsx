import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';

import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput, Icon } from './styles';

/**  passando todas as propriedade, recebendo duas propriedade a mais */
// useCallback
interface InputProps extends TextInputProps {
  name: string;
  icon: string; // recebe o nomo do icon, no native e uma string
}
// Ref of the datas come from inputs from

interface InputeValueReference {
  value: string;
}
interface InputRef {
  focus(): void;
}
// por padrão o FC não recebe uma ref
const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputeValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // if have value ? true : false
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  // permite acessa uma informação do component filho pelo o pai
  useImperativeHandle(ref, () => ({
    focus() {
      // aplica o focus no elemento, no caso o input
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        // recive value where try set value manualy.
        // reponsibullity for  visuality change
        inputValueRef.current.value = value; // set the value
        inputElementRef.current.setNativeProps(
          { text: value }, // seta native props
        );
      },
      clearValue() {
        // clear value
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isError={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#FFFFFF' : '#232129'}
      />
      <TextInput
        ref={inputElementRef}
        defaultValue={defaultValue}
        keyboardAppearance="dark" // only ios
        placeholderTextColor="#FFFFFF"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={value => {
          // referencia
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
