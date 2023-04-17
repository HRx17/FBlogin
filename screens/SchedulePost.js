import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {AccessToken, LoginButton} from 'react-native-fbsdk-next';

const dimentions = Dimensions.get('screen');
const ip = 'vivacious-teal-gopher.cyclic.app';

const SchedulePost = ({navigation}) => {
  const [email, onChangeText] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
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
    navigation.addListener('beforeRemove', event => {
      event.preventDefault();
    });
  }, [navigation]);
  return (
    <React.Fragment>
      {!user && (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {user && (
        <View style={styles.container}>
          <View style={{flexDirection: 'row', marginTop: '5%'}}>
            <Image
              source={require('../assets/images/tempimg.jpeg')}
              style={{
                height: 40,
                width: 40,
                borderRadius: 200,
                marginRight: '5%',
              }}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 26,
                marginTop: '1%',
                marginRight: '50%',
              }}>
              {user.username}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              height: 250,
              color: 'black',
              backgroundColor: '#E4E4E4',
              borderRadius: 15,
              width: '90%',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 20,
              padding: 8,
            }}>
            <Image
              style={{height: 40, width: 40}}
              source={require('../assets/images/addicon.png')}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 8,
              }}>
              Add Photos
            </Text>
          </TouchableOpacity>
          <TextInput
            style={{
              height: 100,
              backgroundColor: 'white',
              borderColor: '#E4E4E4',
              borderWidth: 1,
              borderRadius: 20,
              elevation: 0.8,
              width: '90%',
              color: 'black',
              margin: 5,
              marginLeft: '1%',
              padding: 20,
            }}
            numberOfLines={25}
            multiline={true}
            textContentType="text"
            placeholderTextColor={'grey'}
            placeholder="Add to Your Post"
            onChangeText={onChangeText}
            value={email}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#1778f2',
              width: 200,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10%',
              borderRadius: 50,
            }}
            onPress={() => setOpen(true)}>
            <Text style={{color: 'white'}}>Pick Date</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <TouchableOpacity>
            <View style={styles.insta}>
              <Text style={styles.text}>Schedule</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </React.Fragment>
  );
};

export default SchedulePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: '#1778f2',
    fontWeight: '',
    marginLeft: '40%',
    marginRight: '40%',
    fontSize: 18,
    fontFamily: 'OpenSans',
    textAlign: 'center',
  },
  insta: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '92%',
    height: 48,
    borderColor: '#1778f2',
    borderWidth: 1.4,
    marginTop: '15%',
    borderRadius: 27,
  },
});
AppRegistry.registerComponent('SchedulePost', SchedulePost);
