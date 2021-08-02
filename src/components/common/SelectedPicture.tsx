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
  const [label, setLabel] =
    React.useState<[{confidence: number; identifier: string}]>();
  const [classification, setClassification] = React.useState(
    'Tap for classification',
  );

  const navigation = useNavigation();
  const routeParams = (useRoute().params ?? {}) as {
    uri: string;
  };

  const updateReact = (e: {
    label: React.SetStateAction<
      [{confidence: number; identifier: string}] | undefined
    >;
  }) => {
    setLabel(e.label);
  };

  const updateNative = () => {
    ref.update(routeParams.uri);
  };

  React.useEffect(() => {
    if (label !== undefined) {
      const data = label.reduce((accum, curr) => {
        let identifier = curr.identifier.split(',')[0];

        return `${accum} ${identifier} (${
          Math.round(100 * curr.confidence) / 100
        })`;
      }, '');

      setClassification(data);
    }
  }, [label, setClassification]);

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
