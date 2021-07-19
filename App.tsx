import React from 'react';
import {Box, UtilityThemeProvider} from 'react-native-design-utility';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './src/navigators/MainStackNavigator';
import * as RNFS from 'react-native-fs';

import {theme} from './src/constants/theme';
import {NetworkMLModelPath, Path, File} from './src/constants/coremlPath';
import {ActivityIndicator} from 'react-native';

const App = () => {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        // const {promise} = await RNFS.downloadFile({
        //   fromUrl: NetworkMLModelPath,
        //   toFile: RNFS.MainBundlePath + Path,
        // });

        // console.log('promise', (await promise).statusCode);

        const exists = await RNFS.exists(`${RNFS.MainBundlePath}/${File}`);

        console.log('file exists', exists);

        setIsReady(true);
      } catch (error) {
        console.log(
          error,
          'check src/constants/coremlPath is installing correct model',
        );
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
