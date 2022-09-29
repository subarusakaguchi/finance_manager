import styled from "styled-components/native";
import { TextInput } from 'react-native'
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TextInput)`
  width: 100%;
  padding: 16px 18px;

  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  font-size: ${RFValue(14)}px;

  background-color: ${({ theme }) => theme.COLORS.SHAPE};
  color: ${({ theme }) => theme.COLORS.TEXT_DARK};

  border-radius: 8px;

  margin-bottom: 8px;
`
