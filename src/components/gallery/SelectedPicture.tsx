/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Image} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {theme} from '../../constants/theme';
import * as RNFS from 'react-native-fs';

// import {coreml} from '../../navigators/services/coreml';
import {compileModel, classifyTopValue} from 'react-native-coreml';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NetworkMLModelPath =
  'https://github.com/hollance/MobileNet-CoreML/raw/master/MobileNet.mlmodel';

const coreml = async (
  pathToImage: string,
): Promise<{label: string; confidence: string} | undefined> => {
  try {
    const {jobId, promise} = RNFS.downloadFile({
      fromUrl: NetworkMLModelPath,
      toFile: `${RNFS.DocumentDirectoryPath}MobileNetV2.mlmodel`,
    });

    await promise;
    console.log('jobId', jobId);

    const [{name, path, isFile, isDirectory}] = await RNFS.readDir(
      `${RNFS.DocumentDirectoryPath}`,
    );
    console.log('name', name, 'path', path, isFile(), isDirectory());

    // const modelPath = await compileModel(path);

    // const {label, confidence} = await classifyTopValue(pathToImage, modelPath);

    console.log('The image is a ' + label + '. I think. ');
    // return {label: label, confidence: confidence};
  } catch (error) {
    console.log(error);
  }
};

const SelectedPicture = () => {
  const routeParams = (useRoute().params ?? {}) as {
    uri: string;
  };

  // const {label, confidence} = coreml(routeParams.uri);

  if (routeParams.uri) {
    return (
      <Box f={1} center>
        <Box f={1} center>
          <Image
            source={{uri: routeParams.uri}}
            style={{height: windowHeight / 1.3, width: windowWidth / 1.05}}
          />
        </Box>

        <Box bg={theme.color.greyLight} border={10} center position="absolute">
          <Text bold style={{position: 'absolute'}}>
            Hello World
          </Text>
        </Box>
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
