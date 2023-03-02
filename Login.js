import React, { Component } from 'react'; 

import { 
  AppRegistry, 
  StyleSheet, 
  View 
} from 'react-native'; 

import { 
  AccessToken,
  GraphRequest, 
  GraphRequestManager, 
  LoginButton 
} from 'react-native-fbsdk-next'; 

var userId = "";
var accesstoken = "";
var userName = "";
var emaill = "";


export default class Login extends Component { 
  render() { 
    return ( 
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
                 this._getFeed(); 
                 accesstoken = data.accessToken.toString();
                
                 }
              } 
            } 
          onLogoutFinished={() => console.log("logout.")} 
        /> 
      </View> 
    ); 
  }  
  _getFeed () { 
    const infoRequest = new GraphRequest('/me?fields=id,name,email', null,
    this._responseInfoCallback); 
    new GraphRequestManager().addRequest(infoRequest).start(); 
  } 
  _responseInfoCallback (error, result) { 
    if (error) { 
      console.log('Error fetching data: ', error.toString()); 
      return; 
    }
    userName = result.name.toString();
    userId = result.id.toString();
    emaill = result.email.toString();
    
    if(userName){
      fetch('http://192.168.29.166:3000/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({
        "username":{userName},
        "email":{emaill},
        "accessToken":{accesstoken},
        "userid":{userId}
      }),
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.error(error);
    });
    }
    }
  } 

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',  
  } 
}); 

AppRegistry.registerComponent('Login', () => Login); 
