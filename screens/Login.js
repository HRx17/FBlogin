import React,{useState, useEffect, useCallback} from 'react'; 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import props from 'deprecated-react-native-prop-types';
import InstagramLogin from 'react-native-instagram-login';
import {WebView} from 'react-native-webview';


import { 
  AppRegistry, 
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  Linking,
  Text,
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


const dimentions = Dimensions.get('screen');


const Login  = ({navigation}) => {

  setIgToken = (data) => {
    console.log('data', data);
    navigation.navigate('Home');
  }

  //linkedin
  onNavigationStateChange = navState => {
  console.log(navState);
 };
 
 renderContent = () => {
  
  const clientSecret="I07p3K8s2QYeUBIA";
  const clientid = "86uy64s2mcd9e2";
  const redirecturi = "http://127.0.0.1/callback";
  console.log("method");
  return (
    <View>
    <WebView
      source={{
        uri: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientid}&redirect_uri=${redirecturi}&state=foobar&scope=r_liteprofile%20r_emailaddress%20w_member_social`,
     }}
      onNavigationStateChange={this.onNavigationStateChange}
      style={{ flex: 1 }}
    />
    </View>
  );
 }


  const check = AsyncStorage.getItem('isLoggedIn');
  const tkn = AsyncStorage.getItem("accessToken");
  const [email,setEmail] = useState();
  const [payload,setPayload] = useState();

  console.log(tkn);

  useEffect(()=> {
    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('isLoggedIn');
        if (value === true) {
          navigation.navigate('Home');
          console.log("done")
          // let's go 
        }else {
          console.log("false");
        }
      } catch (error) {
        console.log(error,"error");
        // Error retrieving data
      }
   };
    _retrieveData();
  }, []);

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
      navigation.navigate('Home');
    })
    .catch(error => {
      console.error(error);
    });
    }
  }

  //linkedin
  const getUser = async data => {
    const {access_token, authentication_code} = data;
    if (!authentication_code) {
     const response = await fetch(
    `https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams) )`,
   {
    method: 'GET',
    headers: {
     Authorization: 'Bearer ' + access_token,
    },
    },
   );
   const apipayload = await response.json();
   setPayload(apipayload);
   }
   else {
    alert(`authentication_code = ${authentication_code}`);
   }
   };
//linkedin
   const getUserEmailId = async data => {
    const {access_token, authentication_code} = data;
    if (!authentication_code) {
     const response = await fetch(
     'https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))',
     {
     method: 'GET',
     headers: {
      Authorization: 'Bearer ' + access_token,
     },
     },
     );
     const emailpayload = await response.json();
   
     setEmail(emailpayload.elements[0]['handle~'].emailAddress);
     handleGetUser();
     }
     else {
      Alert.alert(`authentication_code = ${authentication_code}`);
     }
   };

   // handle naviation to home for linkedin
   const handleGetUser = useCallback(() => {
    if (payload) {
     if (props.setFirstName) {
     props.setFirstName(payload.firstName.localized.en_US);
    }
     if (props.setLastName) {
      props.setLastName(payload.lastName.localized.en_US);
     }
     if (props.setProfileImage) { 
     if (payload.profilePictfsure !== undefined&&
    payload.profilePicture['displayImage~'] !== null&&
    payload.profilePicture['displayImage~'].elements[3].identifiers[0].identifier !== null &&
    payload.profilePicture['displayImage~'].elements[3].identifiers[0].identifier !== undefined)
     {
     props.setProfileImage(payload.profilePicture['displayImage~'].elements[3].identifiers[0].identifier,);
    }
    else {
     props.setProfileImage(
     'https://picsum.photos/200',);
     }
    }
    if (props.setLinkedInId) {
     props.setLinkedInId(payload.id);
    }
    if (email) {
     if (props.setEmailId) {
     props.setEmailId(email);
     props.setIsLoggedIn(true);
     props.navigation.replace('HomeScreen', {
      FName: payload.firstName.localized.en_US,
      LName: payload.lastName.localized.en_US,
      EmailId: email,
    ImageUri:payload.profilePicture['displayImage~'].elements[3].identifiers[0].identifier,
     From: 'LINKEDIN',
     });
    }
    }
    }
    }, [email, payload, this.props]);



    return ( 
      <React.Fragment>
        <View  style={ styles.container }>
          <Image style={styles.img} source={require('../assets/images/intro_pic.png')}/>
          <Text style={styles.textBold}>Welcome to PostSchedula</Text>
          <Text style={{alignItems: 'center', color: 'black', fontWeight: 'bold'}}>Schedule your posts and much more</Text>
          <View style={styles.buttons}>
        <LoginButton 
          style={{height: 33, width: 200,}}
          readPermissions={["public_profile", "user_photos", 
          "user_posts", "user_events", "user_likes"]} 
          autoLoad={true}
          async onLoginFinished={        
            async (error, result) => { 
              if (error) { 
              } else if (result.isCancelled) { 
                console.log("login is cancelled."); 
              } else { 
                 const data = await AccessToken.getCurrentAccessToken(); 
                 _getFeed(); 
                 AsyncStorage.setItem('accessToken',data.accessToken.toString());
                 AsyncStorage.setItem('isLoggedIn',true);
                 accesstoken = data.accessToken.toString();
                 console.log(AsyncStorage.getItem('accessToken'));
                 //navigation.navigate('Home');
                 }
              } 
            } 
          onLogoutFinished={() => console.log("logout.")} 
        /> 
        </View>
        <View>
        <TouchableOpacity
          style={[styles.insta,styles.elevation]}
          onPress={() => this.instagramLogin.show()}>
          <Image source={require('../assets/images/instalogo.png')} style={styles.icon} />
          <Text style={styles.text}>Log in</Text>
        </TouchableOpacity>
        <InstagramLogin
          ref={ref => (this.instagramLogin = ref)}
          appId='765633485162702'
          appSecret='21a5dded677d779dfbb5e299b5563f41'
          redirectUrl='https://127.0.0.1/callback'
          scopes={['user_profile', 'user_media']}
          onLoginSuccess={this.setIgToken}
          onLoginFailure={(data) => console.log(data)}
        />
        </View>
        <View>
        <TouchableOpacity
          style={[styles.insta,styles.elevation]}
          onPress={this.renderContent}>
          <Image source={require('../assets/images/linkedinlogo.png')} style={styles.twitter} />
          <Text style={styles.text}>Log in</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.insta,styles.elevation]}>
        <Image source={require('../assets/images/twitter.png')} style={styles.twitter} />
            <Text style={styles.text}> Log in </Text>
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
  elevation: {
    elevation: 7,
    shadowColor: 'grey',
  },
  img: {
    justifyContent: 'center',
    height: 231,
    width: 183
  },
  text: { 
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginEnd: 60 
  },
  twitter: {
    justifyContent: 'center',
    height: 23,
    width: 23,
    marginEnd: 40
  },
  icon: {
    justifyContent: 'center',
    height: 20,
    width: 20,
    marginEnd: 43
  },
  buttons: { 
    backgroundColor: 'white',
    marginTop: 57,
    marginBottom: 27,
  },
  insta: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'white',
    width: 200,
    height: 35,
    borderRadius: 6,
    
    shadowOpacity: 1,
    shadowColor: 'black',
    marginTop: 7,
    marginBottom: 27,
  },
  linkedin: {
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: 'white',
      width: 200,
      height: 35,
      borderRadius: 6,
      borderColor: 'grey',
      borderWidth: 1,
      marginTop: 7,
      shadowOpacity: 1,
      shadowColor: 'black',
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
}); 
AppRegistry.registerComponent('Login',Login);