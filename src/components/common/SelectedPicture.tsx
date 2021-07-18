/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Image} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {theme} from '../../constants/theme';
import * as RNFS from 'react-native-fs';
import {compileModel, classifyTopValue} from 'react-native-coreml';
import Icon from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const coreml = async (pathToImage: string) => {
  //: Promise<{label: string; confidence: string} | undefined>
  try {
    const modelPath = await compileModel(
      `${RNFS.MainBundlePath}/MobileNetV2.mlmodelc`,
    );
    const {label, confidence} = await classifyTopValue(pathToImage, modelPath);
    console.log('The image is a ' + label + '. I think. ');
    return {label: label, confidence: confidence};
  } catch (error) {
    console.log(error);
  }
};

const SelectedPicture = () => {
  const navigation = useNavigation();
  const routeParams = (useRoute().params ?? {}) as {
    uri: string;
  };

  // const {label: label, confidence: confidence} = coreml(routeParams.uri);
  // coreml(routeParams.uri);

  if (routeParams.uri) {
    return (
      <SafeAreaView style={s.safeArea}>
        <Box f={1} center>
          <Box>
            <Box p="sm">
              <TouchableOpacity onPress={navigation.goBack}>
                <Icon name="x" size={30} color={theme.color.blueLight} />
              </TouchableOpacity>
            </Box>

            <Box style={s.image}>
              <Image
                source={{uri: routeParams.uri}}
                style={{height: windowHeight / 1.3, width: windowWidth / 1.05}}
              />
            </Box>

            <Box bg={theme.color.greyLighter} center style={s.label}>
              <Text bold p="sm">
                Label Confidence
              </Text>
            </Box>
          </Box>
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <Box f={1} center>
      <Text color={theme.color.red}>Error loading image</Text>
    </Box>
  );
};

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  label: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
});

export default SelectedPicture;
