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

var userId = AsyncStorage.getItem('userId');
var accesstoken = AsyncStorage.getItem('accessToken');
console.log(accesstoken);


const dimentions = Dimensions.get('screen');

const Home  = ({navigation}) => {

  const _getFeed = () => { 
    const infoRequest = new GraphRequest('/me?fields=id,name,email', null,
    _responseInfoCallback); 
    new GraphRequestManager().addRequest(infoRequest).start(); 
  } 
  const _responseInfoCallback =  (error, result) => { 
    if (error) { 
      console.log('Error fetching data: ', error.toString()); 
      return; 
    }
    userName = result.name.toString();
    userId = result.id.toString();
    emaill = result.email.toString();
    AsyncStorage.setItem('userId',result.id.toString());

    var userObj = {
      "username":userName,
      "email":emaill,
      "accessToken":accesstoken,
      "userid":userId
    }
    if(userName){
    axios.post('http://192.168.29.166:3000/api/user/signup', userObj)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.error(error);
    });
    }
  }
    return ( 
      <React.Fragment> 
      <View style={ styles.container }>
      <LoginButton 
          readPermissions={["public_profile", "user_photos", 
          "user_posts", "user_events", "user_likes"]} 
          async onLoginFinished={        
            async (error, result) => { 
              if (error) { 
              } else if (result.isCancelled) { 
                console.log("login is cancelled."); 
              } else { 
                 const data = await AccessToken.getCurrentAccessToken(); 
                 AsyncStorage.setItem('accessToken',data.accessToken.toString());
                 AsyncStorage.setItem('isLoggedIn',true);
                 accesstoken = data.accessToken.toString();
                
                 }
              } 
              
            } 
          onLogoutFinished={() =>{ 
            console.log("logout.");
            AsyncStorage.removeItem('isLoggedIn');
            AsyncStorage.setItem('isLoggedIn',false);
            navigation.navigate('Login');
        }} 
        /> 
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
    backgroundColor: '#f7f7f7'
  },
}); 
AppRegistry.registerComponent('Home',Home);
