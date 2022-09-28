import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'

interface TransactionType {
  type: 'negative' | 'positive';
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.SHAPE};

  border-radius: 8px;

  padding: 17px 24px;
  margin-bottom: 16px;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.REGULAR};;
  font-size: ${RFValue(14)}px;

  margin-bottom: 16px;
`;

export const Amount = styled.Text<TransactionType>`
  font-family: ${({ theme }) => theme.FONTS.REGULAR};;
  font-size: ${RFValue(20)}px;
  margin-top: 2px;
  color: ${({ theme, type }) => type === 'positive' ? `${theme.COLORS.SUCCESS}` : `${theme.COLORS.ATTENTION}`}
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 19px;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.COLORS.TEXT};
`;

export const CategoryName = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.COLORS.TEXT};

  margin-left: 17px;
`;

export const Date = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.COLORS.TEXT};
`;
