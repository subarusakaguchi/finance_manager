import React from 'react';
import { Container, Error } from './styles';

import { Input } from '../Input';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import { Merge, FieldError, FieldErrorsImpl } from 'react-hook-form/dist/types'

interface InputFormProps extends TextInputProps {
  control: Control;
  name: string;
  errorMsg: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

export function InputForm({
  control,
  name,
  errorMsg,
  ...rest
}: InputFormProps) {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }}) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
      />
      {errorMsg && <Error>{ errorMsg }</Error>}
    </Container>
  );
}
