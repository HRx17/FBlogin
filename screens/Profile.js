import React from 'react'; 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  AppRegistry,
  StyleSheet, 
  View,
  Text,
  Dimensions
} from 'react-native'; 

import { 
  AccessToken,
  LoginButton 
} from 'react-native-fbsdk-next'; 




const dimentions = Dimensions.get('screen');

const Profile  = ({navigation}) => {

    return ( 
      <React.Fragment> 
      <View style={ styles.container }>
        <Text style={{color: 'black'}}>Profile Screen</Text>
        </View>
      </React.Fragment> 
    ); 
  }

export default Profile;

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',  
    backgroundColor: '#f7f7f7'
  },
}); 
AppRegistry.registerComponent('Profile',Profile);
