import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

// import { Dashboard } from './src/screens/Dashboard';
import { Register } from './src/screens/Register'
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  return (
    <ThemeProvider theme={theme}>
      {fontsLoaded ? <Register /> : <Loading />}
    </ThemeProvider>
  );
}
