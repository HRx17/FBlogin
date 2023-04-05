import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootSiblingParent} from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import DocumentPicker from 'react-native-document-picker';
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

import {TextInput} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';

var userId = '';
var accesstoken = '';
var userName = '';
var emaill = '';
var id = '';

const Signup = ({navigation}) => {
  const [name, onChangeName] = useState('');
  const [email, onChangeText] = useState('');
  const [password, onChangePass] = useState('');
  const [password2, onChangePass2] = useState('');
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

  //image picker
  const [image, setProfile] = useState('');

  const openImageLib = async () => {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });
    //const result = await launchImageLibrary();
    const data = new FormData();
    console.log(res);
    setProfile(res);
    data.append('image', res[0]);
    fetch('https://vivacious-teal-gopher.cyclic.app/api/user/imgupload', {
      method: 'POST',
      body: data,
    })
      .then(result => {
        console.log('File Sent');
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  // signin api call method
  register = () => {
    if (email === '' || password === '' || password2 === '' || name === '') {
      let toast = Toast.show('Please enter all details', {
        duration: Toast.durations.LONG,
      });
      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 2000);
    } else if (password != password2) {
      let toast = Toast.show('Password Dont match', {
        duration: Toast.durations.LONG,
      });
      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 2000);
    } else {
      var userObj = {
        username: name,
        email: email,
        password: password,
      };
      console.log(userObj);
      if (userObj != null) {
        axios
          .post('http://192.168.1.21:3000/api/user/signup', userObj)
          .then(response => {
            if (response.data.message) {
              let toast = Toast.show(response.data.message, {
                duration: Toast.durations.LONG,
              });
              setTimeout(function hideToast() {
                Toast.hide(toast);
              }, 2000);
            } else {
              console.log(response.data._id);
              AsyncStorage.setItem('Id', response.data._id.toString());
              //AsyncStorage.setItem('isLoggedIn', 'true');
              navigation.navigate('Connect');
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
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
          <View style={{marginLeft: 24, marginTop: 50}}>
            <Text style={styles.textBold}>Sign Up</Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Open Sans',
                fontSize: 16,
                marginLeft: 3,
              }}>
              Create your Post Schedula profile now
            </Text>
          </View>
          <View style={styles.container}>
            <View>
              <TouchableOpacity onPress={openImageLib} style={styles.uploadBtn}>
                {image ? (
                  <Image
                    source={{uri: image}}
                    style={{height: '100%', width: '100%', borderRadius: 100}}
                  />
                ) : (
                  <Text style={{color: 'black', textAlign: 'center'}}>
                    Upload Image
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <TextInput
              style={{
                height: 40,
                marginTop: 30,
                backgroundColor: 'white',
                width: '92%',
                margin: 8,
                padding: 8,
              }}
              underlineColorAndroid="black"
              textContentType="name"
              placeholder="Enter Name"
              onChangeText={onChangeName}
              value={name}
            />
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
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={onChangePass}
              value={password}
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
              secureTextEntry={true}
              placeholder="Confirm Password"
              onChangeText={onChangePass2}
              value={password2}
            />
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => register()}>
                <View style={styles.insta}>
                  <Text style={styles.text}>Sign Up</Text>
                </View>
              </TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: 'black',
                    marginTop: 8,
                    fontFamily: 'sans-serif-medium',
                  }}>
                  {' '}
                  Already have an account ?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  <View>
                    <Text
                      style={{
                        color: '#1778f2',
                        fontWeight: 'bold',
                        marginTop: 8,
                        marginLeft: 5,
                        fontFamily: 'sans-serif-medium',
                      }}>
                      Sign In
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </React.Fragment>
    </RootSiblingParent>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 60,
  },
  uploadBtn: {
    height: 120,
    width: 120,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 125 / 2,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 46,
    fontFamily: 'Open Sans Bold',
    marginTop: 30,
  },
});
AppRegistry.registerComponent('Signup', Signup);
