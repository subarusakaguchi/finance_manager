import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};

  width: 100%;
  height: ${RFValue(113)}px;

  justify-content: flex-end;
  align-items: center;

  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  font-size: ${RFValue(18)}px;

  color: ${({ theme }) => theme.COLORS.SHAPE};

`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 24, flex: 1 },
})``;
