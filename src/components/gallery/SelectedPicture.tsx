/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import {Box} from 'react-native-design-utility';

const SelectedPicture: React.FC<{uri: string}> = uri => (
  <Box f={1} center>
    <Image source={uri} style={{height: 300, width: 200}} />
  </Box>
);

export default SelectedPicture;
