import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

interface TransactionsTypesProps {
  type: 'up' | 'down';
}

interface ButtonsContainerProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled.View<ButtonsContainerProps>`
  width: 48%;

  border-width: ${({ isActive }) => isActive ? 0 : 1.5}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.COLORS.TEXT};
  border-radius: 8px;

  ${({ isActive, type }) => isActive && type === 'down' && css`
    background-color: ${({ theme }) => theme.COLORS.ATTENTION_LIGHT};
  `}

  ${({ isActive, type }) => isActive && type === 'up' && css`
    background-color: ${({ theme }) => theme.COLORS.SUCCESS_LIGHT};
  `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px;
`;

export const Icon = styled(Feather)<TransactionsTypesProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }) => type === 'up' ? theme.COLORS.SUCCESS : theme.COLORS.ATTENTION};
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.REGULAR};;
  font-size: ${RFValue(14)}px;
`;

