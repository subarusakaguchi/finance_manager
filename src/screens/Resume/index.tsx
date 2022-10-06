import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from "react-native";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import React, { useCallback, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { VictoryPie } from 'victory-native';
import { HistoryCard } from '../../components/HistoryCard';
import { TransactionCardProps } from '../../components/TransactionCard';
import { categories } from '../../utils/categories';
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectSelectIcon,
  Month,
  LoadContainer
} from './styles';
import { useFocusEffect } from '@react-navigation/native';

interface TransactionData extends TransactionCardProps { }

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalCategories, setTotalCategories] = useState<CategoryData[]>([])

  const theme = useTheme()

  function handleChangeDate(action: 'next' | 'prev') {
    if (action === 'next') {
      const newDate = addMonths(selectedDate, 1)

      setSelectedDate(newDate)
    } else if (action === 'prev') {
      const newDate = subMonths(selectedDate, 1)

      setSelectedDate(newDate)
    }
  }

  async function loadData() {
    setIsLoading(true)

    const dataKey = '@finance_manager:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const formattedResponse = response ? JSON.parse(response) : []

    const expenses: Array<TransactionData> = formattedResponse
      .filter((transaction: TransactionData) => {
        return (transaction.type === 'negative') &&
          (new Date(transaction.date).getMonth() === selectedDate.getMonth()) &&
          (new Date(transaction.date).getFullYear() === selectedDate.getFullYear())
      })

    const expensesTotal = expenses.reduce((acc: number, expense: TransactionData) => {
      return acc + Number(expense.amount);
    }, 0)

    const allCategories: CategoryData[] = []

    categories.forEach(category => {
      let categorySum = 0;

      expenses.forEach((transaction: TransactionData) => {
        if (transaction.category === category.key) {
          categorySum += Number(transaction.amount)
        }
      })

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const percent = `${(categorySum / expensesTotal * 100).toFixed(0)}%`

        allCategories.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent
        });
      }
    })

    setTotalCategories(allCategories)
    setIsLoading(false)
  }

  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]))

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator
            color={theme.COLORS.PRIMARY}
            size='large'
          />
        </LoadContainer>
      ) :
        <Content
          showVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: useBottomTabBarHeight(),
            paddingHorizontal: 24
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleChangeDate('prev')}>
              <MonthSelectSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

            <MonthSelectButton onPress={() => handleChangeDate('next')}>
              <MonthSelectSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalCategories}
              colorScale={totalCategories.map(cat => cat.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.COLORS.SHAPE
                }
              }}
              labelRadius={100}
              x="percent"
              y="total"
            />
          </ChartContainer>
          {totalCategories.map(item => {
            return (
              <HistoryCard
                key={item.key}
                title={item.name}
                amount={item.totalFormatted}
                color={item.color}
              />
            )
          })}
        </Content>}

    </Container>
  );
}
