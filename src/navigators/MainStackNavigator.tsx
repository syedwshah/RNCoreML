import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';
import SelectedPicture from '../components/common/SelectedPicture';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator headerMode="none" mode="modal">
      <MainStack.Screen name="Tabs" component={MainTabNavigator} />
      <MainStack.Screen name="SelectedPicture" component={SelectedPicture} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
