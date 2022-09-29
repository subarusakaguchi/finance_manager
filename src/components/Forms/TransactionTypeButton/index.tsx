import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import {
  Container,
  Icon,
  Title
} from './styles';

interface TransactionTypeButtonProps extends TouchableOpacityProps {
  title: string;
  type: 'up' | 'down';
  isActive: boolean;
}

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: TransactionTypeButtonProps) {
  return (
    <Container {...rest} isActive={isActive} type={type}>
      <Icon
        name={`arrow-${type}-circle`}
        size={24}
        type={type}
      />
      <Title>
        {title}
      </Title>
    </Container>
  );
}
