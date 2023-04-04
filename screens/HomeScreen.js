import React, {useEffect} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {AppRegistry} from 'react-native';
import Home from './Home';
import Settings from './Settings';
import SchedulePost from './SchedulePost';
import Icon from 'react-native-vector-icons/AntDesign';
import {BackHandler} from 'react-native';
import {Alert} from 'react-native';

const Tab = createMaterialBottomTabNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#075fed"
      activeBackgroundColor="#FAF7F6"
      barStyle={{backgroundColor: 'white'}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Schedule Post"
        component={SchedulePost}
        options={{
          tabBarLabel: 'Schedule Post',
          tabBarIcon: ({color}) => (
            <Icon name="calendar" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Settings}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => <Icon name="user" color={color} size={26} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;

AppRegistry.registerComponent('HomeScreen', HomeScreen);
