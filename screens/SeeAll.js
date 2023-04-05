import React, {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  AppRegistry,
  StyleSheet,
  View,
  Alert,
  Pressable,
  Modal,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native';
import {FlatList} from 'react-native';
import {GraphRequest, GraphRequestManager} from 'react-native-fbsdk-next';

var userId = AsyncStorage.getItem('userId');
var accesstoken = AsyncStorage.getItem('accessToken');
console.log(accesstoken);
const username = 'Haet';

const dimentions = Dimensions.get('screen');

const SeeAll = ({route}) => {
  const postData = route.params.item;
  logOut = () => {
    navigation.navigate('Login');
    console.log('logout');
  };

  return (
    <React.Fragment>
      <View style={{backgroundColor: '#f7f7f7'}}>
        <View style={styles.container}>
          <View
            style={{
              height: 50,
              weight: 100,
              flexDirection: 'row',
              backgroundColor: '#f7f7f7',
              marginBottom: 0,
              flex: 1,
            }}>
            <Image
              source={require('../assets/images/logo.png')}
              style={{
                height: 40,
                width: 40,
                borderRadius: 200,
                marginLeft: 10,
                marginTop: 0,
              }}
            />
            <TouchableOpacity
              style={{
                marginLeft: 10,
                height: 32,
                weight: 30,
                marginLeft: 300,
                marginTop: 3,
              }}>
              <Icon name="setting" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {postData && (
          <View styles={{flex: 2, height: '70%'}}>
            <FlatList
              data={postData}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
                marginTop: 90,
              }}
              keyExtractor={(item, index) => item.toString()}
              renderItem={({item}) => (
                <View style={[styles.card, styles.elevation]}>
                  <Image
                    style={{
                      margin: 3,
                      height: '100%',
                      position: 'absolute',
                      width: '100%',
                      borderRadius: 10,
                      alignSelf: 'center',
                    }}
                    source={
                      item.media_url
                        ? {uri: item.media_url}
                        : require('../assets/images/Default_Image.png')
                    }
                  />
                  <View
                    style={{
                      position: 'relative',
                      top: '38%',
                      height: 63,
                      borderBottomStartRadius: 10,
                      borderBottomEndRadius: 10,
                      width: '100%',
                      backgroundColor: 'rgba(220, 220, 220, 0.70)',
                    }}>
                    <Text
                      style={{
                        marginStart: '10%',
                        marginTop: 15,
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      {item.caption ? item.caption : 'Post'}
                    </Text>
                  </View>
                </View>
              )}></FlatList>
          </View>
        )}
      </View>
    </React.Fragment>
  );
};

export default SeeAll;

const styles = StyleSheet.create({
  viewStyleForLine: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    marginBottom: 440,
    width: '100%',
  },
  elevation: {
    elevation: 7,
    shadowColor: 'grey',
  },
  card: {
    height: 350,
    width: 350,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 6,
    shadowOpacity: 1,
    shadowColor: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
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
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    width: 100,
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
  textb: {
    color: 'black',
    fontSize: 11,
    marginLeft: 14,
    marginTop: 5,
    textAlign: 'left',
    fontFamily: 'monospace',
  },
});
AppRegistry.registerComponent('SeeAll', SeeAll);

/*

<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View>
          <Text style={{width: 50, textAlign: 'center', color: 'black' }}>Posts</Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
        <View style={{height: 300}}>

        </View>
        <FlatList>

        </FlatList>

        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 0}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View>
          <Text style={{width: 130, textAlign: 'center', color: 'black' }}>Scheduled Posts</Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
        <View style={{height: 300}}>

        </View>
        <FlatList>
          
        </FlatList>

*/
