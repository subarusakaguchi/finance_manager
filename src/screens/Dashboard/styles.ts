import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { FontAwesome } from '@expo/vector-icons'
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'

import { DataListProps } from '.';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
`

export const UserContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;
`

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  border-radius: 12px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.COLORS.SHAPE};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.COLORS.SHAPE};

  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const PowerOffIcon = styled(FontAwesome).attrs({
  name: 'power-off',
  size: RFValue(24),
})`
  color: ${({ theme }) => theme.COLORS.SECONDARY};
`

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 24, paddingRight: 150 }
})`
  width: 100%;

  position: absolute;

  margin-top: ${RFPercentage(20)}px;
`

export const Transactions = styled.View`
  flex: 1;

  padding: 0 24px;
  margin-top: ${RFPercentage(15)}px;
`;


export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;


export const TransactionsList = styled(
  FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: getBottomSpace() + 20 }
})``

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
