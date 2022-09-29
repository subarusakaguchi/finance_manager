import React, { useState } from 'react';

import { useForm } from 'react-hook-form'

import {
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { InputForm } from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';

import { CategorySelect } from '../CategorySelect';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import {
  Container,
  Form,
  Header,
  Title,
  Fields,
  TransactionsTypes
} from './styles';

export interface FormData {
  [name: string]: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number().typeError('Informe um valor numérico').positive('O valor não pode ser negativo').required('O valor é obrigatório')
})

export function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })
  const [transactionType, setTransactionType] = useState<'up' | 'down' | undefined>()
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  function handleTransactionTypeButtonSelect(typeSelected: 'up' | 'down') {
    setTransactionType(typeSelected);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo de transação')
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione uma categoria')
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data)
  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name='name'
              control={control}
              placeholder="Nome"
              autoCapitalize='sentences'
              autoCorrect={false}
              errorMsg={errors.name && errors.name.message}
            />
            <InputForm
              name='amount'
              control={control}
              placeholder="Preço"
              keyboardType='number-pad'
              errorMsg={errors.amount && errors.amount.message}
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
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>
          <Button
            activeOpacity={0.7}
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}
