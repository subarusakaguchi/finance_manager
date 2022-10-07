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

import uuid from 'react-native-uuid'

import {
  Container,
  Form,
  Header,
  Title,
  Fields,
  TransactionsTypes
} from './styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

export interface FormData {
  [name: string]: string;
}

type NavigationProps = {
  navigate: (screen: string) => void;
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
  const [transactionType, setTransactionType] = useState<'positive' | 'negative' | undefined>()
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false)

  const { user } = useAuth()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const navigation = useNavigation<NavigationProps>()

  function handleTransactionTypeButtonSelect(typeSelected: 'positive' | 'negative') {
    setTransactionType(typeSelected);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo de transação')
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione uma categoria')
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const dataKey = `@finance_manager:transactions_user=${user.id}`

      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : []

      const formattedData = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData))

      reset()
      setTransactionType(undefined)
      setCategory({
        key: 'category',
        name: 'Categoria'
      })

      navigation.navigate("Listagem")
    } catch (err) {
      console.log(err)
      Alert.alert('Não foi possível salvar os dados!')
    }
  }

  return (
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
                onPress={() => handleTransactionTypeButtonSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton
                title='Outcome'
                type="down"
                onPress={() => handleTransactionTypeButtonSelect('negative')}
                isActive={transactionType === 'negative'}
              />
            </TransactionsTypes>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>
          <GestureHandlerRootView>
            <Button
              title="Enviar"
              onPress={handleSubmit(handleRegister)}
            />
          </GestureHandlerRootView>
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
