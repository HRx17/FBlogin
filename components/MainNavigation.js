import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from '../components/NavBar';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Connect from '../screens/Connect';
import HomeScreen from '../screens/HomeScreen';
import SeeAll from '../screens/SeeAll';
import Intro from '../screens/Intro';

const Stack = createNativeStackNavigator();

class MainNavigation extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator headerMode={'screen'}>
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{
            headerTransparent: true,
            tabBarVisible: false,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={false} />
            ),
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTransparent: true,
            tabBarVisible: false,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={false} />
            ),
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerTransparent: true,
            tabBarVisible: false,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={false} />
            ),
          }}
        />
        <Stack.Screen
          name="Connect"
          component={Connect}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={false} />
            ),
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            gestureEnabled: false,
            headerLeft: null,
            headerTransparent: true,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={false} />
            ),
          }}
        />
        <Stack.Screen
          name="SeeAll"
          component={SeeAll}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={false} />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;
//
