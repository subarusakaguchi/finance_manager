import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
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
  LogoutButton,
  LoadContainer
} from "./styles";

interface HighlighProps {
  amount: string;
}

interface HighlighData {
  entries: HighlighProps;
  expenses: HighlighProps;
  total: HighlighProps;
}

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highlightData, setHighlighData] = useState<HighlighData>({} as HighlighData);

  const theme = useTheme()

  async function loadTransactions() {
    const dataKey = '@finance_manager:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensesTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
      item.type === 'positive' ?
        (entriesTotal += Number(item.amount)) : (expensesTotal += Number(item.amount))

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

    setTransactions(transactionsFormatted)
    setHighlighData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      expenses: {
        amount: expensesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      total: {
        amount: (entriesTotal - expensesTotal).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    })

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []))

  return (
    <Container>

      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator
            color={theme.COLORS.PRIMARY}
            size='large'
          />
        </LoadContainer>
      ) :
        (<>
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
              amount={highlightData.entries.amount}
              lastTransaction="Última transação dia 13 de abril"
              type="up"
            />
            <HighlightCard
              title="Saída"
              amount={highlightData.expenses.amount}
              lastTransaction="Última transação dia 13 de abril"
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction="Última transação dia 13 de abril"
              type="total"
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>)}
    </Container>
  )
}
