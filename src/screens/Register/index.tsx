import React, { useState } from 'react';
import { Button } from '../../components/Forms/Button';
import { CategorySelect } from '../../components/Forms/CategorySelect';
import { Input } from '../../components/Forms/Input';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import {
  Container,
  Form,
  Header,
  Title,
  Fields,
  TransactionsTypes
} from './styles';

export function Register() {
  const [transactionType, setTransactionType] = useState<'up' | 'down' | undefined>()

  function handleTransactionTypeButtonSelect(typeSelected: 'up' | 'down') {
    setTransactionType(typeSelected);
  }

  return(
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input
            placeholder="Nome"
          />
          <Input
            placeholder="Preço"
          />

          <TransactionsTypes>
            <TransactionTypeButton
              title='Income'
              type="up"
              onPress={() => handleTransactionTypeButtonSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              title='Outcome'
              type="down"
              onPress={() => handleTransactionTypeButtonSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>

          <CategorySelect title='Categoria' />
        </Fields>

        <Button activeOpacity={0.7} title="Enviar" />
      </Form>

    </Container>
  )
}
