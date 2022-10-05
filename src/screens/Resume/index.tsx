import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import { TransactionCardProps } from '../../components/TransactionCard';
import { categories } from '../../utils/categories';
import { Container, Header, Title, Content } from './styles';

interface TransactionData extends TransactionCardProps { }

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const [totalCategories, setTotalCategories] = useState<CategoryData[]>([])

  async function loadData() {
    const dataKey = '@finance_manager:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const formattedResponse = response ? JSON.parse(response) : []

    const expenses: Array<TransactionData> = formattedResponse
      .filter((transaction: TransactionData) => transaction.type === 'negative')

    const allCategories: CategoryData[] = []

    categories.forEach(category => {
      let categorySum = 0;

      expenses.forEach((transaction: TransactionData) => {
        if (transaction.category === category.key) {
          categorySum += Number(transaction.amount)
        }
      })

      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        allCategories.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total
        });
      }
    })

    setTotalCategories(allCategories)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {totalCategories.map(item => {
          return (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.total}
              color={item.color}
            />
          )
        })}
      </Content>

    </Container>
  );
}
