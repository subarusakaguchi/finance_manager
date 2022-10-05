import React from "react";
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


const dataTransactionTest: DataListProps[] = [
  {
    id: Math.random().toString(36).substring(2, 20),
    type: 'positive',
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    date: "12/07/2022",
    category: { name: "Venda", icon: "dollar-sign"},
  },
  {
    id: Math.random().toString(36).substring(2, 20),
    type: 'negative',
    title: "Hamburguer",
    amount: "R$ 82,00",
    date: "14/08/2022",
    category: { name: "Almoço", icon: "coffee"},
  },
  {
    id: Math.random().toString(36).substring(2, 20),
    type: 'positive',
    title: "Salário",
    amount: "R$ 5.000,00",
    date: "05/09/2022",
    category: { name: "Trabalho", icon: "dollar-sign"},
  }
]

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserContainer>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/subarusakaguchi.png'}} />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Subaru!</UserName>
            </User>
          </UserInfo>

          <GestureHandlerRootView>
            <LogoutButton onPress={() => {console.log('Teste')}}>
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
          data={dataTransactionTest}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  )
}
