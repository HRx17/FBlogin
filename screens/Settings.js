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
const ip = '192.168.1.21';

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
  logout = () => {
    dispatchMethod();
    AsyncStorage.setItem('isLoggedIn', 'false');
    AsyncStorage.setItem('instatoken', '');
    AsyncStorage.setItem('fbaccessToken', '');
    try {
      axios
        .post(`http://${ip}:3000/api/user/logout/${id}`)
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
          <Icon name="mode-edit" size={32} color={'black'} />
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
                Logout of all platforms at once
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
          style={{marginTop: '5%'}}
          source={require('../assets/images/intro_pic.png')}
        />
        <View style={styles.segment}>
          <Icon name="mail" color={'black'} size={40} />
        </View>
        <View style={{flex: 2, marginTop: 40}}>
          <TouchableOpacity style={styles.insta} onPress={() => showLogout()}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                alignItems: 'center',
              }}>
              Log Out
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
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  insta: {
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
    margin: 15,
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
