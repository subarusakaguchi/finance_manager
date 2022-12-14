import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton).attrs({
  activeOpacity: 0.7
})`
  background-color: ${({ theme }) => theme.COLORS.SHAPE};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 8px;
  padding: 18px 16px;

  margin-top: 8px;
`;

export const Category = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.COLORS.TEXT}
`;
