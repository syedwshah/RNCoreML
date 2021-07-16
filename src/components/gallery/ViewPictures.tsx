import React from 'react';
import {Image, FlatList, TouchableHighlight, StyleSheet} from 'react-native';

import {theme} from '../../constants/theme';
import {Box} from 'react-native-design-utility';
import {useNavigation} from '@react-navigation/core';

import {EdgeNode} from '../types';

const ViewPictures = (pictures: {picture: EdgeNode[] | any}) => {
  const navigation = useNavigation();

  const renderItem = ({item}: {item: EdgeNode | any}) => {
    return (
      <Box>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate('SelectedPicture', {
              uri: item.node.image.uri,
            });
          }}>
          <Image source={{uri: item.node.image.uri}} style={styles.image} />
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
