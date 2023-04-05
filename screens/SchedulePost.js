import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {AccessToken, LoginButton} from 'react-native-fbsdk-next';

const dimentions = Dimensions.get('screen');

const SchedulePost = ({navigation}) => {
  const [email, onChangeText] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    navigation.addListener('beforeRemove', event => {
      event.preventDefault();
    });
  }, [navigation]);
  return (
    <React.Fragment>
      <View style={styles.container}>
        <Text style={{color: 'black', marginTop: '30%'}}>
          Scheduling in progress
        </Text>
        <TextInput
          style={{
            height: 50,
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 15,
            width: '90%',
            margin: 15,
            padding: 8,
          }}
          textContentType="text"
          placeholderTextColor={'grey'}
          placeholder="Caption"
          onChangeText={onChangeText}
          value={email}
        />
        <TextInput
          style={{
            height: 150,
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 15,
            width: '90%',
            margin: 15,
            padding: 8,
          }}
          textContentType="text"
          placeholderTextColor={'grey'}
          placeholder="Add Image"
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
    marginTop: '30%',
    borderRadius: 27,
  },
});
AppRegistry.registerComponent('SchedulePost', SchedulePost);
