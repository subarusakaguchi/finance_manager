import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserContainer,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  PowerOffIcon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([])

  async function loadTransactions() {
    const dataKey = '@finance_manager:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : [];
    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })

      const date = new Date(item.date)
      const dateFormatted = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(date)

      return {
        id: item.id,
        name: item.name,
        type: item.type,
        category: item.category,
        amount,
        date: dateFormatted
      }
    })

    setData(transactionsFormatted)
  }

  useEffect(() => {
    loadTransactions();
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []))

  return (
    <Container>
      <Header>
        <UserContainer>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/subarusakaguchi.png' }} />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Subaru!</UserName>
            </User>
          </UserInfo>

          <GestureHandlerRootView>
            <LogoutButton onPress={() => { console.log('Teste') }}>
              <PowerOffIcon />
            </LogoutButton>
          </GestureHandlerRootView>
        </UserContainer>

      </Header>

      <HighlightCards >
        <HighlightCard
          title="Entrada"
          amount="17.084,02"
          lastTransaction="Última transação dia 13 de abril"
          type="up"
        />
        <HighlightCard
          title="Saída"
          amount="2.801,05"
          lastTransaction="Última transação dia 13 de abril"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount="14.345.98"
          lastTransaction="Última transação dia 13 de abril"
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  )
}
