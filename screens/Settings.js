import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const _retrieveData = async () => {
      try {
        setId(await AsyncStorage.getItem('Id'));
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
      <View style={styles.container}>
        <TouchableOpacity style={{marginTop: '5%', marginLeft: '80%'}}>
          <Icon name="mode-edit" size={22} color={'black'} />
        </TouchableOpacity>
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
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
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
        <Image
          style={{
            marginTop: '5%',
            marginBottom: '5%',
            borderRadius: 550,
            height: 150,
            borderColor: '#1778f2',
            borderWidth: 3,
            width: 150,
          }}
          source={require('../assets/images/Default_Image.png')}
        />
        <Text></Text>
        <View style={[styles.segment]}>
          <Icon name="mail" color={'black'} size={25} style={{margin: 20}} />
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              margin: 20,
              fontWeight: 'bold',
            }}>
            Email here
          </Text>
        </View>
        <View style={styles.segment}>
          <Icon name="" color={'black'} size={25} style={{margin: 20}} />
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              marginTop: 50,
              marginBottom: 50,
            }}>
            {' '}
            Information here
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.segment,
            {alignItem: 'center', justifyContent: 'center'},
          ]}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              marginTop: '5%',
              marginLeft: '25%',
              fontWeight: 'bold',
            }}>
            Notification Settings
          </Text>
          <TouchableOpacity style={{margin: 20, marginLeft: '25%'}}>
            <Icon name="arrow-forward-ios" color={'black'} size={20} />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={{flex: 2, marginTop: 40}}>
          <TouchableOpacity style={styles.insta} onPress={() => showLogout()}>
            <Icon
              name="logout"
              color={'white'}
              size={20}
              style={{marginRight: '25%'}}
            />
            <Text
              style={{fontWeight: 'bold', color: 'white', marginRight: '30%'}}>
              Log Out
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.delete} onPress={() => showLogout()}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                alignItems: 'center',
              }}>
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  );
};

export default Settings;

const styles = StyleSheet.create({
  segment: {
    width: '100%',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 5,
    borderTopColor: 'lightgrey',
    borderTopWidth: 5,
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
    height: 48,
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
    width: 280,
    height: 48,
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
});
AppRegistry.registerComponent('Settings', Settings);
