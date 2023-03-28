import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootSiblingParent} from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';

import {
  AppRegistry,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginButton,
} from 'react-native-fbsdk-next';
import {TextInput} from 'react-native-paper';

var userId = '';
var accesstoken = '';
var userName = '';
var emaill = '';
var id = '';

const dimentions = Dimensions.get('screen');

const Login = ({navigation}) => {
  const [email, onChangeText] = useState('');
  const [password, onChangePass] = useState('');
  useEffect(() => {
    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('isLoggedIn');
        id = await AsyncStorage.getItem('id');
        tkn = await AsyncStorage.getItem('accessToken');
        if (value === 'true') {
          navigation.navigate('HomeScreen');
          console.log('done');
          // let's go
        } else {
          console.log('false');
        }
      } catch (error) {
        console.log(error, 'error');
        // Error retrieving data
      }
    };
    _retrieveData();
  }, []);

  // signin api call method
  signin = () => {
    if (email === '' || password === '') {
      let toast = Toast.show('Please enter all details', {
        duration: Toast.durations.LONG,
      });
      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 2000);
    } else {
      onChangeText('');
      onChangePass('');
      var userObj = {
        email: email,
        password: password,
      };
      if (userObj != null) {
        console.log(userName);
        axios
          .post('http://192.168.0.195:3000/api/user/login', userObj)
          .then(response => {
            if (response.data.message) {
              let toast = Toast.show(response.data.message, {
                duration: Toast.durations.LONG,
              });
              setTimeout(function hideToast() {
                Toast.hide(toast);
              }, 2000);
            } else {
              console.log(response.data.id);
              AsyncStorage.setItem('Id', response.data.id.toString());
              AsyncStorage.setItem('isLoggedIn', 'true');
              navigation.navigate('Connect');
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };

  //signin with facebook api call
  const _getFeed = () => {
    const infoRequest = new GraphRequest(
      '/me?fields=id,name,email',
      null,
      _responseInfoCallback,
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  };
  const _responseInfoCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data: ', error.toString());
      return;
    }
    userName = result.name.toString();
    userId = result.id.toString();
    emaill = result.email.toString();
    AsyncStorage.setItem('userId', userId);
    AsyncStorage.setItem('name', userName);

    var userObj = {
      username: userName,
      email: emaill,
      accessToken: accesstoken,
      userid: userId,
    };
    if (userObj != null) {
      console.log(userName);
      axios
        .post('http://192.168.29.166:3000/api/user/signup', userObj)
        .then(response => {
          console.log(response.data);
          AsyncStorage.setItem('Id', response.data._id.toString());
          navigation.navigate('HomeScreen', {
            userid: userId,
            access: accesstoken,
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <RootSiblingParent>
      <React.Fragment>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="white"
          translucent={true}
        />
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{marginLeft: 24, marginTop: 64}}>
            <Text style={styles.textBold}>Sign in</Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Open Sans',
                fontSize: 20,
                marginLeft: 3,
              }}>
              Good to see you again
            </Text>
          </View>
          <View style={styles.container}>
            <TextInput
              style={{
                height: 40,
                backgroundColor: 'white',
                width: '92%',
                margin: 8,
                padding: 8,
              }}
              underlineColorAndroid="black"
              textContentType="emailAddress"
              placeholder="Email Address"
              onChangeText={onChangeText}
              value={email}
            />
            <TextInput
              style={{
                height: 40,
                backgroundColor: 'white',
                width: '92%',
                margin: 8,
                color: 'black',
                padding: 8,
              }}
              underlineColorAndroid="black"
              textContentType="password"
              placeholder="Password"
              onChangeText={onChangePass}
              value={password}
            />
            <TouchableOpacity>
              <View>
                <Text
                  style={{
                    color: 'black',
                    marginRight: '58%',
                    marginTop: 8,
                    fontFamily: 'sans-serif-medium',
                  }}>
                  Forgot password?
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => signin()}>
                <View style={styles.insta}>
                  <Text style={styles.text}>Sign in</Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#1778f2',
                  width: '92%',
                  height: 48,
                  margin: 16,
                  borderRadius: 27,
                }}>
                <LoginButton
                  style={{
                    height: 32,
                    width: 350,
                    marginLeft: '2%',
                    marginRight: '2%',
                    borderRadius: 20,
                    margin: 8,
                  }}
                  readPermissions={[
                    'public_profile',
                    'user_photos',
                    'user_posts',
                    'user_events',
                    'user_likes',
                  ]}
                  autoLoad={true}
                  async
                  onLoginFinished={async (error, result) => {
                    if (error) {
                    } else if (result.isCancelled) {
                      console.log('login is cancelled.');
                    } else {
                      const data = await AccessToken.getCurrentAccessToken();
                      _getFeed();
                      AsyncStorage.setItem(
                        'accessToken',
                        data.accessToken.toString(),
                      );
                      AsyncStorage.setItem('isLoggedIn', 'true');
                      accesstoken = data.accessToken.toString();
                      console.log(accesstoken);
                      navigation.navigate('HomeScreen');
                    }
                  }}
                  onLogoutFinished={() => console.log('logout.')}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Signup');
                }}>
                <View style={styles.insta}>
                  <Text
                    style={{
                      color: '#1778f2',
                      fontWeight: '',
                      marginLeft: '29%',
                      marginRight: '29%',
                      fontSize: 18,
                      fontFamily: 'OpenSans',
                      textAlign: 'center',
                    }}>
                    Sign Up with Email
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </React.Fragment>
    </RootSiblingParent>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 100,
  },
  elevation: {
    elevation: 7,
    shadowColor: 'grey',
  },
  text: {
    color: '#1778f2',
    fontWeight: '',
    marginLeft: '41%',
    marginRight: '41%',
    fontSize: 18,
    fontFamily: 'OpenSans',
    textAlign: 'center',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 57,
    marginBottom: 27,
  },
  insta: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '92%',
    height: 48,
    borderColor: '#1778f2',
    borderWidth: 1.4,
    margin: 16,
    borderRadius: 27,
  },
  textBold: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    color: 'black',
    fontSize: 56,
    fontFamily: 'Open Sans Bold',
    marginTop: 30,
  },
});
AppRegistry.registerComponent('Login', Login);
