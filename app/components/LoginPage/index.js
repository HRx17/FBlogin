// Friends/app/components/LoginPage/index.js 

import React, { Component } from 'react'; 
import { 
  View 
} from 'react-native'; 

import { 
  LoginButton 
} from 'react-native-fbsdk-next'; 

import styles from './styles'; 

export default class LoginPage extends Component { 
  render() { 
    return ( 
      <View style={ styles.container }> 
        <LoginButton 
        readPermissions={["public_profile", "user_photos",
        "user_posts", "user_events", "user_likes"]} 
          onLoginFinished={ 
            (error, result) => { 
              if (error) { 
                console.log('Error logging in: ', error.toString()); 
                return; 
              } 
              if (result.isCancelled) { 
                console.log('login was cancelled'); 
                return; 
              } 
              this.props.getFeed(); 
            } 
        } 
        onLogoutFinished={() => console.log("logout")} 
      /> 
    </View> 
  ); 
} 
} 