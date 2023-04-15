import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import {StatusBar} from 'react-native';

import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button,
  Image,
  Dimensions,
  Modal,
} from 'react-native';

import {AccessToken, LoginButton} from 'react-native-fbsdk-next';
import Icon from 'react-native-vector-icons/MaterialIcons';
const dimentions = Dimensions.get('screen');
const ip = 'vivacious-teal-gopher.cyclic.app';

const Settings = ({navigation}) => {
  const [id, setId] = useState('');
  const [user, setUser] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const _retrieveData = async () => {
      try {
        setId(await AsyncStorage.getItem('Id'));
        console.log(id);
        axios
          .get(`https://${ip}/api/user/${await AsyncStorage.getItem('Id')}`)
          .then(response => {
            console.log(response.data.users);
            setUser(response.data.users);
          })
          .catch(error => {
            console.log(error);
          });
      } catch (error) {
        console.log(error, 'error');
        // Error retrieving data
      }
    };
    _retrieveData();
  }, [navigation]);

  dispatchMethod = () => {
    navigation.addListener('beforeRemove', event => {
      navigation.dispatch(event.data.action);
    });
    navigation.navigate('Login');
  };

  showLogout = () => {
    setModalVisible(!modalVisible);
  };
  showDelete = () => {
    setModalVisible(!modalVisible);
  };
  logout = () => {
    dispatchMethod();
    AsyncStorage.setItem('isLoggedIn', 'false');
    AsyncStorage.setItem('instatoken', '');
    AsyncStorage.setItem('fbaccessToken', '');
    try {
      axios
        .post(`https://${ip}/api/user/logout/${id}`)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      {!user && (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {user && (
        <View style={styles.container}>
          <StatusBar translucent backgroundColor="transparent" />
          <View
            style={{
              position: 'absolute',
              height: 300,
              top: 0,
              borderRadius: 20,
              width: '100%',
            }}>
            <Image
              source={require('../assets/images/back1.jpeg')}
              style={{height: 300, borderRadius: 25, width: '100%'}}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                position: 'relative',
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: '6%',
                marginLeft: '5%',
                top: 40,
              }}>
              Profile
            </Text>
            <TouchableOpacity style={{marginTop: '15%', marginLeft: '70%'}}>
              <Icon name="mode-edit" size={22} color={'white'} />
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
                  Are you sure you wish to continue?
                </Text>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    logout();
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.textStyle}>Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 100,
                    marginTop: 20,
                    borderRadius: 20,
                    padding: 10,
                    elevation: 1,
                  }}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={{justifyContent: 'center', marginTop: '1%'}}>
            <Image
              style={{
                marginTop: '5%',
                marginBottom: '1%',
                borderRadius: 550,
                height: 100,
                borderColor: 'white',
                borderWidth: 2,
                width: 100,
                alignSelf: 'center',
              }}
              source={require('../assets/images/tempimg.jpeg')}
            />
            <View
              style={{
                marginTop: '2%',
                marginBottom: '5%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {user.username}
              </Text>
              <Text
                style={{
                  fontSize: 18,

                  color: 'white',
                }}>
                {user.email}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: '10%'}}>
            <TouchableOpacity style={styles.likes}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                1.2k
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'grey',
                  fontWeight: 'bold',
                }}>
                Followers
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.likes}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                2.4k
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'grey',
                  fontWeight: 'bold',
                }}>
                Likes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.likes}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                450
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'grey',
                  fontWeight: 'bold',
                }}>
                Posts
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.segment,
              {alignItem: 'center', justifyContent: 'center'},
            ]}>
            <Icon
              name="notifications-active"
              color={'black'}
              size={20}
              style={{marginRight: '1%', marginTop: '5%', marginLeft: '5%'}}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                marginTop: '5%',
                marginLeft: '1%',
                fontWeight: 'bold',
              }}>
              Notification Settings
            </Text>
            <TouchableOpacity style={{margin: 20, marginLeft: '47%'}}>
              <Icon name="arrow-forward-ios" color={'black'} size={20} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItem: 'center',
              justifyContent: 'center',
              width: '98%',
              borderBottomColor: 'lightgrey',
              borderBottomWidth: 2.5,
              borderTopColor: 'lightgrey',
              backgroundColor: 'white',
              flexDirection: 'row',
            }}>
            <Icon
              name="access-time"
              color={'black'}
              size={20}
              style={{marginRight: '1%', marginTop: '5%', marginLeft: '5%'}}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                marginTop: '5%',
                marginLeft: '1%',
                fontWeight: 'bold',
              }}>
              Configure Time
            </Text>
            <TouchableOpacity style={{margin: 20, marginLeft: '56%'}}>
              <Icon name="arrow-forward-ios" color={'black'} size={20} />
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={{flex: 2, marginTop: '20%'}}>
            <TouchableOpacity style={styles.insta} onPress={() => showLogout()}>
              <Icon
                name="logout"
                color={'white'}
                size={20}
                style={{marginRight: '25%'}}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  marginRight: '30%',
                }}>
                Log Out
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.delete}
              onPress={() => showLogout()}>
              <Icon
                name="delete-outline"
                color={'white'}
                size={20}
                style={{marginRight: '15%'}}
              />
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginRight: '20%',
                }}>
                Delete Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </React.Fragment>
  );
};

export default Settings;

const styles = StyleSheet.create({
  segment: {
    width: '98%',
    marginTop: '3%',

    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2.5,
    borderTopColor: 'lightgrey',
    borderTopWidth: 2.5,
    alignContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  insta: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 280,
    height: 43,
    backgroundColor: '#1778f2',
    borderRadius: 25,
    borderColor: '#1778f2',
    borderWidth: 1.4,
    shadowOpacity: 1,
    shadowColor: 'black',
    margin: 10,
  },
  delete: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    width: 280,
    height: 43,
    backgroundColor: '#e33030',
    borderRadius: 25,
    borderColor: '#e33030',
    borderWidth: 1.4,
    shadowOpacity: 1,
    shadowColor: 'black',
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    width: 55,
    height: 55,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 0.5,
    shadowOpacity: 1,
    shadowColor: 'black',
    marginTop: 7,
    shadowColor: 'grey',
    marginBottom: 27,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  button: {
    width: 130,
    marginTop: 40,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textbold: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 40,
    textAlign: 'left',
    fontFamily: 'monospace',
  },
  likes: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    width: 95,
    height: 65,
    borderRadius: 12,
    borderColor: 'grey',
    borderWidth: 1,
    shadowOpacity: 1,
    shadowColor: 'black',
    marginTop: '3%',
    shadowColor: 'grey',
    marginBottom: 27,
  },
});
AppRegistry.registerComponent('Settings', Settings);
