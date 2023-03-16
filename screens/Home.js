import React, {useState} from 'react'; 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  AppRegistry,
  StyleSheet, 
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native'; 

var userId = AsyncStorage.getItem('userId');
var accesstoken = AsyncStorage.getItem('accessToken');
console.log(accesstoken);


const dimentions = Dimensions.get('screen');

const Home  = ({navigation}) => {

  openSettings = () => {
    console.log("settings");
  }
 
    return ( 
      <React.Fragment> 
      <View style={ styles.container }>
        <View style={{height: 50, weight: 100, flexDirection: 'row', marginBottom: 760}}>
          <TouchableOpacity
          onPress={openSettings}>
            <Image style={{marginLeft: 10, height: 20, weight: 30, marginRight: 370, marginTop: 10}} source={require("../assets/images/menu.png")}/>
          </TouchableOpacity>
        </View>
      </View>
      </React.Fragment> 
    ); 
  }

export default Home;

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',  
  },
}); 
AppRegistry.registerComponent('Home',Home);
