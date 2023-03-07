import React from 'react'; 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {LinkedInModal} from 'react-native-linkedin';

import { 
  AppRegistry, 
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'; 

import { 
  AccessToken,
  GraphRequest, 
  GraphRequestManager, 
  LoginButton 
} from 'react-native-fbsdk-next'; 
import LinkedInModal from 'react-native-linkedin';

var userId = "";
var accesstoken = "";
var userName = "";
var emaill = "";

const dimentions = Dimensions.get('screen');

const Login  = ({navigation}) => {

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
        <View  style={ styles.container }>
          <Image style={styles.img} source={require('../assets/images/intro_pic.png')}/>
          <Text style={styles.textBold}>Welcome to PostSchedula</Text>
          <Text style={styles.text}>Schedule your posts and much more</Text>
          <View style={styles.buttons}>
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
                 _getFeed(); 
                 AsyncStorage.setItem('accessToken',data.accessToken.toString());
                 accesstoken = data.accessToken.toString();
                 navigation.navigate('Home');
                 }
              } 
            } 
          onLogoutFinished={() => console.log("logout.")} 
        /> 
        </View>
        <LinkedInModal clientID="86uy64s2mcd9e2" clientSecret="I07p3K8s2QYeUBIA" redirectUri="http:/192.168.29.166:3000/auth/linkedin/callback" 
        onSuccess= {
          token => {
            console.log(token);
          }
        }
        />
        <TouchableOpacity style={styles.insta}>
            <Text style={{color: 'white', fontWeight: 'bold',}}> LinkedIn </Text>
      </TouchableOpacity>
        </View> 
      </React.Fragment> 
    ); 
  }

export default Login;

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',  
    backgroundColor: 'white'
  },
  img: {
    justifyContent: 'center',
    height: 231,
    width: 183
  },
  buttons: { 
    backgroundColor: 'white',
    marginTop: 57,
    marginBottom: 27,
  },
  insta: {
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'blue',
    width: 200,
    height: 40,
    borderRadius: 20,
    marginTop: 7,
    marginBottom: 27,
  },
  textBold: {
    justifyContent: 'center', 
    alignItems: 'center',  
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    justifyContent: 'center', 
    alignItems: 'center',  
    backgroundColor: 'white',
    color: 'black',
    fontSize: 17,
    marginTop: 10,
    marginBottom: 50,
  }
}); 
AppRegistry.registerComponent('Login',Login);