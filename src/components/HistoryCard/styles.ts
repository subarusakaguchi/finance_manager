import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface CardProps {
  color: string;
}

export const Container = styled.View<CardProps>`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};

  flex-direction: row;
  justify-content: space-between;

  padding: 12px 24px;

  border-radius: 4px;
  border-left-width: 5px;
  border-left-color: ${({ color }) => color};

  margin-bottom: 8px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  font-size: ${RFValue(15)}px;
`;

export const Amount = styled.Text`
    font-family: ${({ theme }) => theme.FONTS.BOLD};
  font-size: ${RFValue(15)}px;
`;
