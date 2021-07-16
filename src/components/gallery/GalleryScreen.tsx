import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import CameraRoll from '@react-native-community/cameraroll';
import {TouchableOpacity} from 'react-native';

import {theme} from '../../constants/theme';
import ViewPictures from './ViewPictures';
import {EdgeNode} from '../types';

const GalleryScreen = () => {
  const [showGallery, setShowGallery] = React.useState<boolean>(false);
  const [pictures, setPictures] = React.useState<EdgeNode[] | any[]>([]);

  const getPicturesFromGallery = async () => {
    try {
      const res = await CameraRoll.getPhotos({first: 5000});

      setShowGallery(true);
      // console.log('Edges', res.edges);
      setPictures(res.edges);
      // console.log('pictures', pictures);
    } catch (error) {
      console.log(error);
    }
  };

  // may want to navigate to ViewPictures to open this up as a modal
  if (showGallery) {
    return <ViewPictures picture={pictures} />;
  }

  return (
    <Box f={1} center>
      <TouchableOpacity onPress={async () => getPicturesFromGallery()}>
        <Text color={theme.color.blue}>Choose from photo library</Text>
      </TouchableOpacity>
    </Box>
  );
};

export default GalleryScreen;
