import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import {
  Container,
  Icon,
  Title,
  Button
} from './styles';

interface TransactionTypeButtonProps extends RectButtonProps {
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
    <Container isActive={isActive} type={type}>
      <Button {...rest}>
        <Icon
          name={`arrow-${type}-circle`}
          size={24}
          type={type}
        />
        <Title>
          {title}
        </Title>
      </Button>
    </Container>
  );
}
