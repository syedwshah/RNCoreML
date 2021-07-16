/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Image} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {theme} from '../../constants/theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SelectedPicture = () => {
  const routeParams = (useRoute().params ?? {}) as {
    uri: string;
  };

  console.log('routeParams', routeParams.uri);

  if (routeParams.uri) {
    return (
      <Box f={1} center>
        <Image
          source={{uri: routeParams.uri}}
          style={{height: windowHeight / 1.3, width: windowWidth / 1.05}}
        />
      </Box>
    );
  }

  return (
    <Box f={1} center>
      <Text color={theme.color.red}>Error loading image</Text>
    </Box>
  );
};

export default SelectedPicture;
