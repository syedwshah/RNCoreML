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
      const res = await CameraRoll.getPhotos({
        first: 50,
        assetType: 'Photos',
      });

      setShowGallery(true);
      setPictures(res.edges);
    } catch (error) {
      console.log(error);
    }
  };

  if (showGallery) {
    return (
      <Box f={1}>
        <ViewPictures picture={pictures} />
        {/* <Box center pb="sm">
          <TouchableOpacity onPress={async () => getPicturesFromGallery()}>
            <Text color={theme.color.blue}>Choose more photos</Text>
          </TouchableOpacity>
        </Box> */}
      </Box>
    );
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
