import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import { Loading } from './src/components/Loading';

import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/components/routes/app.routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        {fontsLoaded ? (
          <NavigationContainer>
            <AppRoutes />
          </NavigationContainer>
        ) : <Loading />}
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
