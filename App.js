import React, {useEffect} from "react";
import SplashScreen from 'react-native-splash-screen';
import {
  StyleSheet
} from 'react-native'; 

import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from './components/MainNavigation';


const App = () => {
  useEffect(()=> {
    SplashScreen.hide();
  })
    return (
      <NavigationContainer >
      <MainNavigation/>
    </NavigationContainer>);
};


export default App;

const styles = StyleSheet.create({
  demo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

