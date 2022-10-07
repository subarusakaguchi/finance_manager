import React from 'react';
import { SvgProps } from 'react-native-svg'
import { RectButtonProps } from 'react-native-gesture-handler';
import {
  Button,
  ImageContainer,
  Title
} from './styles';

interface SignInSocialButtonProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>
}

export function SignInSocialButton({
  title,
  svg: Svg,
  ...rest
}: SignInSocialButtonProps) {
  return (
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>

      <Title>
        {title}
      </Title>
    </Button>
  );
}
