import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavBar from '../components/NavBar';
import Login from '../screens/Login';
import Home from '../screens/Home';
import HomeScreen from '../screens/HomeScreen';
import SeeAll from '../screens/SeeAll';


const Stack = createNativeStackNavigator();

class MainNavigation extends React.PureComponent {
    render() {
        return (
        <Stack.Navigator headerMode= {'screen'}>
        <Stack.Screen name="Login" component={Login} options={{headerTransparent: true, header: ({navigation}) => <NavBar navigation={navigation} main={false}/>}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerTransparent: true, header: ({navigation}) => <NavBar navigation={navigation} main={false}/>}}/>
        <Stack.Screen name="SeeAll" component={SeeAll} options={{headerTransparent: true, header: ({navigation}) => <NavBar navigation={navigation} main={false}/>}}/>
      </Stack.Navigator>
        );
    }
}

export default MainNavigation;
//