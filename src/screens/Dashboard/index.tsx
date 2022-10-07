import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { useAuth } from "../../hooks/auth";

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

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlighData {
  entries: HighlightProps;
  expenses: HighlightProps;
  total: HighlightProps;
}

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const { user, signOut } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highlightData, setHighlighData] = useState<HighlighData>({} as HighlighData);

  const theme = useTheme()

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {
    const filteredCollection = collection
      .filter(transaction => transaction.type === type)

    if (filteredCollection.length === 0) {
      return 0
    }

    const lastTransactionEntries = filteredCollection
      .map(transaction => new Date(transaction.date).getTime())

    const lastTransactionDate = new Date(Math.max.apply(Math, lastTransactionEntries))

    const lastTransactionDateFormatted =
      `${lastTransactionDate.getDate()} de ${lastTransactionDate.toLocaleDateString('pt-BR', {
        month: 'long'
      })}`


    return lastTransactionDateFormatted
  }

  async function loadTransactions() {
    const dataKey = `@finance_manager:transactions_user=${user.id}`
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

    const lastDateEntry = getLastTransactionDate(transactions, 'positive');
    const lastDateExpense = getLastTransactionDate(transactions, 'negative');
    const totalInterval = lastDateExpense === 0
      ? 'Não há transações'
      : `1 a ${lastDateExpense}`

    setHighlighData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastDateEntry === 0
          ? 'Não há transações'
          : `última entrada dia ${lastDateEntry}`
      },
      expenses: {
        amount: expensesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastDateExpense === 0
          ? 'Não há transações'
          : `última saída dia ${lastDateExpense}`
      },
      total: {
        amount: (entriesTotal - expensesTotal).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
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
                <Photo source={{ uri: user.avatar }} />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>{user.name}!</UserName>
                </User>
              </UserInfo>

              <GestureHandlerRootView>
                <LogoutButton onPress={signOut}>
                  <PowerOffIcon />
                </LogoutButton>
              </GestureHandlerRootView>
            </UserContainer>

          </Header>

          <HighlightCards >
            <HighlightCard
              title="Entrada"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
              type="up"
            />
            <HighlightCard
              title="Saída"
              amount={highlightData.expenses.amount}
              lastTransaction={highlightData.expenses.lastTransaction}
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
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
