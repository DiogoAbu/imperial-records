import React, { FC, useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';

import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';

import { FontFamilyProvider } from './hooks/use-font-family';
import useStatusBarStyle from './hooks/use-status-bar-style';
import MainStack from './navigators/MainStack';
import { darkTheme, lightTheme } from './services/theme';

const App: FC = () => {
  const colorScheme = useColorScheme();

  useStatusBarStyle();

  useEffect(() => {
    void RNBootSplash.hide({ fade: true });
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
    }
  }, []);

  return (
    <FontFamilyProvider>
      <NavigationContainer theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
        <MainStack />
      </NavigationContainer>
    </FontFamilyProvider>
  );
};

export default App;
