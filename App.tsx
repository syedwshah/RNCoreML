import React from 'react';
import {Box, UtilityThemeProvider} from 'react-native-design-utility';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './src/navigators/MainStackNavigator';

import {theme} from './src/constants/theme';

import {ActivityIndicator} from 'react-native';

const App = () => {
  const [isReady, setIsReady] = React.useState(false);

  //May want to remove useEffect() and ready state entirely
  React.useEffect(() => {
    (async () => {
      try {
        setIsReady(true);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <UtilityThemeProvider theme={theme}>
      {isReady ? (
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      ) : (
        <Box f={1} center>
          <ActivityIndicator />
        </Box>
      )}
    </UtilityThemeProvider>
  );
};

export default App;
