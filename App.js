



import React, {useEffect} from "react";
import { StyleSheet, View, Image } from "react-native";
import Login from "./Login";
import SplashScreen from 'react-native-splash-screen';


const App = () => {
  useEffect(()=> {
    SplashScreen.hide();
  })
    return (
    <View style={styles.basic}>
      <Login/>
    </View>);
};


export default App;

const styles = StyleSheet.create({
  basic: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  image: {
    height: 260,
    width: 200,
  }

});