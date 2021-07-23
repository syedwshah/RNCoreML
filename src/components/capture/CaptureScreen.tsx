import React from 'react';
import {Box} from 'react-native-design-utility';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import {theme} from '../../constants/theme';

const CaptureScreen = () => {
  const [{cameraRef}, {takePicture}] = useCamera(undefined);

  const navigation = useNavigation();

  const captureHandle = async () => {
    try {
      const data = await takePicture();

      navigation.navigate('SelectedPicture', {
        uri: data.uri,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <Box f={1}>
        <RNCamera
          style={s.camera}
          ref={cameraRef}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          useNativeZoom>
          <Box
            mb="lg"
            radius={50}
            backgroundColor={theme.color.greyLighter}
            o="high">
            <TouchableOpacity onPress={() => captureHandle()}>
              <Icon name="hexagon" size={70} color={theme.color.blueLight} />
            </TouchableOpacity>
          </Box>
        </RNCamera>
      </Box>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  capture: {},
});

export default CaptureScreen;
