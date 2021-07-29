/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Box, Text} from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  requireNativeComponent,
  UIManager,
  findNodeHandle,
} from 'react-native';

import {theme} from '../../constants/theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CoreView = requireNativeComponent('CoreView');

const SelectedPicture = () => {
  const [ref, setRef] = React.useState<any>();
  const [label, setLabel] = React.useState(['label data sample']);

  const navigation = useNavigation();
  const routeParams = (useRoute().params ?? {}) as {
    uri: string;
  };

  const updateReact = (e: {
    nativeEvent: {label: React.SetStateAction<string[]>};
  }) => {
    setLabel(e.nativeEvent.label);

    console.log('label in JS', label);
  };

  const updateNative = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(ref),
      UIManager.CoreView.Commands.obtainLabelData,
      [routeParams.uri],
    );
  };

  if (routeParams.uri) {
    return (
      // <SafeAreaView style={s.safeArea}>
      //   <Box f={1} center>
      //     <Box>
      //       <Box p="sm">
      //         <TouchableOpacity onPress={navigation.goBack}>
      //           <Icon name="x" size={30} color={theme.color.blueLight} />
      //         </TouchableOpacity>
      //       </Box>

      //       <Box style={s.image}>
      //         <Image
      //           source={{uri: routeParams.uri}}
      //           style={{height: windowHeight / 1.3, width: windowWidth / 1.05}}
      //         />
      //       </Box>

      //       <Box bg={theme.color.greyLighter} center style={s.label}>
      //         <Text bold p="sm">
      //           Label Confidence
      //         </Text>
      //       </Box>
      //     </Box>
      //   </Box>
      // </SafeAreaView>

      /*
      This is simply manual testing for CoreView module.
      CaptureScreen and GalleryScreen, would be redirected here, to SelectedPicture,
        with image label/confidence data passed as a param
      */
      <SafeAreaView style={s.safeArea}>
        <Box f={1} center style={{borderColor: '#eee', borderBottomWidth: 1}}>
          <TouchableOpacity>
            <Text size="giant" color={theme.color.green}>
              {'count'}
            </Text>
          </TouchableOpacity>
        </Box>
        <TouchableOpacity
          onPress={updateNative}
          style={{
            flex: 1,
            backgroundColor: theme.color.blueLight,
            opacity: 0.1,
          }}>
          <CoreView
            style={{flex: 1}}
            onUpdate={updateReact}
            ref={e => setRef(e)}
          />
        </TouchableOpacity>
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
    backgroundColor: theme.color.white,
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
