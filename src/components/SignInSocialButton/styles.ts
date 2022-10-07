import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Button = styled(RectButton)`
  height: ${RFValue(56)}px;

  background-color: ${({ theme }) => theme.COLORS.SHAPE};

  border-radius: 5px;

  flex-direction: row;
  align-items: center;

  margin-bottom: 16px;
`;

export const ImageContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;

  padding: ${RFValue(16)}px;

  border-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  border-right-width: 1px;
`;

export const Title = styled.Text`
  flex: 1;
  text-align: center;

  font-family: ${({ theme }) => theme.FONTS.MEDIUM};
  font-size: ${RFValue(14)}px;
`;
