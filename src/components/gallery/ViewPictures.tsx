import React from 'react';
import {Image, FlatList, TouchableHighlight, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import SelectedPicture from './SelectedPicture';
import {theme} from '../../constants/theme';
import {Box, Text} from 'react-native-design-utility';
import {EdgeNode} from '../types';

const ViewPictures = (pictures: {picture: EdgeNode[] | any}) => {
  const [showSelected, setShowSelected] = React.useState<boolean>(false);
  const [uri, setUri] = React.useState<string>('');

  console.log('Data', pictures);

  const renderItem = ({item}: {item: EdgeNode | any}) => {
    return (
      <Box>
        <TouchableHighlight
          onPress={() => {
            setShowSelected(true);
            setUri(item.node.image.uri);
          }}>
          <Image source={{uri: item.node.image.uri}} style={styles.image} />
        </TouchableHighlight>
      </Box>
    );
  };

  if (showSelected) {
    return <SelectedPicture uri={uri} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Box f={1}>
        <Box center>
          <Text bold size="lg">
            Select Image
          </Text>
        </Box>

        <Box f={1} m="sm" center>
          <FlatList
            data={pictures.picture}
            renderItem={renderItem}
            keyExtractor={item => item.node.image.uri}
            numColumns={3}
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
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
