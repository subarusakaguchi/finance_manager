import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

`;

export const Header = styled.View`
  width: 100%;
  height: 70%;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY};

  justify-content: flex-end;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.MEDIUM};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.COLORS.SHAPE};

  text-align: center;

  margin-top: 45px;
`;

export const SignInTitle = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.COLORS.SHAPE};

  text-align: center;

  margin-top: 80px;
  margin-bottom: 50px;
`;

export const Footer = styled.View`
  width: 100%;
  height: 70%;

  background-color: ${({ theme }) => theme.COLORS.SECONDARY};
`;

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 32px;

  justify-content: space-between;
`;
