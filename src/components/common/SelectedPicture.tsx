/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Box, Text} from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions, TouchableOpacity, StyleSheet, Image} from 'react-native';

import {theme} from '../../constants/theme';
import CoreView from './CoreView';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SelectedPicture = () => {
  const [ref, setRef] = React.useState<any>();
  const [label, setLabel] = React.useState<any>();
  const [classification, setClassification] = React.useState(
    'Tap for classification',
  );

  const navigation = useNavigation();
  const routeParams = (useRoute().params ?? {}) as {
    uri: string;
  };

  const updateReact = (e: {
    nativeEvent: {label: React.SetStateAction<string[]>};
  }) => {
    setLabel(e.label as [{confidence: string; identifier: string}]);

    console.log('label in JS', label);
  };

  const updateNative = () => {
    ref.update(routeParams.uri);
  };

  React.useEffect(() => {
    if (label !== undefined) {
      let data = label[0];

      setClassification(
        `${data.identifier.split(' ').slice(1).join(' ')} ${
          Math.round(100 * data.confidence) / 100
        }`,
      );
    }
  }, [label]);

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

            <Box f={1} center bg={theme.color.greyLighter} style={s.label}>
              <TouchableOpacity
                onPress={() => {
                  updateNative();
                }}
                style={{
                  backgroundColor: theme.color.greyLighter,
                }}>
                <CoreView onUpdate={updateReact} ref={e => setRef(e)} />
                <Text style={{flex: 1}} bold p="sm">
                  {classification}
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </SafeAreaView>

      /*
      This is simply manual testing for CoreView module.
      CaptureScreen and GalleryScreen, would be redirected here, to SelectedPicture,
        with image label/confidence data passed as a param
      */

      // <SafeAreaView style={s.safeArea}>
      //   <Box f={1}>
      //     <TouchableOpacity
      //       onPress={updateNative}
      //       style={{
      //         flex: 1,
      //         backgroundColor: theme.color.blueLight,
      //         opacity: 1,
      //       }}>
      //       <CoreView
      //         // style={{flex: 1}}
      //         onUpdate={updateReact}
      //         ref={e => setRef(e)}
      //       />
      //     </TouchableOpacity>
      //   </Box>
      // </SafeAreaView>
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
