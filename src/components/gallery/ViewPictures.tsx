import React from 'react';
import {Image, FlatList, TouchableHighlight, StyleSheet} from 'react-native';
import RNFS from 'react-native-fs';

import {theme} from '../../constants/theme';
import {Box} from 'react-native-design-utility';
import {useNavigation} from '@react-navigation/core';

import {EdgeNode} from '../types';

const ViewPictures = (pictures: {picture: EdgeNode[] | any}) => {
  const navigation = useNavigation();

  const renderItem = ({item}: {item: EdgeNode | any}) => {
    const imageUri = item.node.image.uri;

    return (
      <Box>
        <TouchableHighlight
          onPress={() => {
            const destPath =
              'file://private/var/containers/Bundle/Application/ED39A55B-01EC-40D7-A11C-43BFDD6329C7/RNCoreMLApp.app/hazelnut.png';
            RNFS.moveFile(imageUri, destPath)
              .then(() => {
                console.log('Image moved');
              })
              .catch(e => {
                console.log(e);
              });

            navigation.navigate('SelectedPicture', {
              uri: destPath,
            });
          }}>
          <Image source={{uri: imageUri}} style={styles.image} />
        </TouchableHighlight>
      </Box>
    );
  };

  return (
    <Box f={1} center my="sm">
      <FlatList
        data={pictures.picture}
        renderItem={renderItem}
        keyExtractor={item => item.node.image.uri}
        numColumns={3}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 120,
    height: 130,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.color.greyLightest,
  },
});

export default ViewPictures;
