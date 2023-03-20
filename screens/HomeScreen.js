import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
    AppRegistry
  } from 'react-native'; 
import Home from './Home';
import Settings from './Settings';
import Profile from './Profile';
import Icon from 'react-native-vector-icons/AntDesign';

const Tab = createMaterialBottomTabNavigator();

const HomeScreen  = ({navigation}) => {
    return (
      <Tab.Navigator initialRouteName='Home'
      activeColor="#075fed"
      activeBackgroundColor="#FAF7F6"
      barStyle={{ backgroundColor: 'white' }}>
        <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }} />
        <Tab.Screen name="Profile" component={Profile} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={26} />
          ),
        }}  />
        <Tab.Screen name="Settings" component={Settings} options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <Icon name="setting" color={color} size={26} />
          ),
        }}  />
      </Tab.Navigator>
    );
  }

  export default HomeScreen;

  AppRegistry.registerComponent('HomeScreen',HomeScreen);

