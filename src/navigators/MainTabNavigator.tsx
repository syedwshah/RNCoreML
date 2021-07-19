import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import {theme} from '../constants/theme';
import GalleryScreen from '../components/gallery/GalleryScreen';
import CaptureScreen from '../components/capture/CaptureScreen';

const GalleryStack = createStackNavigator();

const GalleryStackNavigator = () => {
  return (
    <GalleryStack.Navigator
      screenOptions={{
        headerTintColor: theme.color.blueLight,
        headerBackTitle: 'Back',
      }}>
      <GalleryStack.Screen name="Gallery" component={GalleryScreen} />
    </GalleryStack.Navigator>
  );
};

const CaptureStack = createStackNavigator();

const CaptureStackNavigator = () => {
  return (
    <CaptureStack.Navigator
      screenOptions={{
        headerTintColor: theme.color.blueLight,
        headerShown: false,
      }}>
      <CaptureStack.Screen name="Capture" component={CaptureScreen} />
    </CaptureStack.Navigator>
  );
};

const ICON_SIZE = 24;

interface TabBarProp {
  focused: boolean;
  color: string;
  size: number;
}

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
      {/* <MainTab.Screen
        name="Live"
        component={GalleryStackNavigator}
        options={{
          title: 'Live',
          tabBarIcon: ({focused, color}): TabBarProp | any => (
            <Icon
              color={focused ? theme.color.red : color}
              size={ICON_SIZE}
              name="play-circle"
            />
          ),
        }}
      /> */}
      <MainTab.Screen
        name="Capture"
        component={CaptureStackNavigator}
        options={{
          title: 'Take Photo',
          tabBarIcon: props => (
            <Icon color={props.color} size={ICON_SIZE} name="camera" />
          ),
        }}
      />

      <MainTab.Screen
        name="Gallery"
        component={GalleryStackNavigator}
        options={{
          tabBarIcon: props => (
            <Icon color={props.color} size={ICON_SIZE} name="image" />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
