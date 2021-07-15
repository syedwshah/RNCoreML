import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import {theme} from '../constants/theme';
import GalleryScreen from '../components/gallery/GalleryScreen';

const GalleryStack = createStackNavigator();

const GalleryStackNavigator = () => {
  return (
    <GalleryStack.Navigator
      screenOptions={{
        headerTintColor: theme.color.blueLight,
        headerTitleStyle: {
          color: theme.color.black,
        },
        headerBackTitle: 'Back',
      }}>
      <GalleryStack.Screen name="Gallery" component={GalleryScreen} />
      <GalleryStack.Screen
        name="ViewPicture"
        component={GalleryScreen}
        options={{headerTitle: ''}}
      />
    </GalleryStack.Navigator>
  );
};

const ICON_SIZE = 24;

const MainTab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      tabBar={tabsProps => (
        <>
          <BottomTabBar {...tabsProps} />
        </>
      )}
      tabBarOptions={{
        activeTintColor: theme.color.blueLight,
      }}>
      <MainTab.Screen
        name="GalleryDefault"
        component={GalleryStackNavigator}
        options={{
          title: 'Gallery',
          tabBarIcon: props => (
            <Icon color={props.color} size={ICON_SIZE} name="image" />
          ),
        }}
      />
      <MainTab.Screen
        name="TakePhoto"
        component={GalleryStackNavigator}
        options={{
          title: 'Taking Photo',
          tabBarIcon: props => (
            <Icon color={props.color} size={ICON_SIZE} name="camera" />
          ),
        }}
      />
      <MainTab.Screen
        name="Live"
        component={GalleryStackNavigator}
        options={{
          title: 'Live',
          tabBarIcon: props => (
            <Icon color={props.color} size={ICON_SIZE} name="play-circle" />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
