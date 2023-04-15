import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const slides = [
  {
    key: 1,
    title: 'Welcome',
    text: 'Connect with us and never worry\n about handling your socials ever again',
    image: require('../assets/images/intro1.png'),
    bg: '#1778f2',
  },
  {
    key: 2,
    title: 'Schedule Posts',
    text: 'Plan and schedule your posts across multiple\n social platform from where and when you want.\n That as well just by a click',
    image: require('../assets/images/intro2.png'),
    bg: '#1778f2',
  },
  {
    key: 3,
    title: 'Easy to Use',
    text: 'Made handling socials easy \n Insign of your profiles in one single platform',
    image: require('../assets/images/intro3.png'),
    bg: '#1778f2',
  },
];

const Intro = ({navigation}) => {
  useEffect(() => {
    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('isLoggedIn');
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

  const _onDone = () => {
    navigation.navigate('Login');
  };

  const _renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider renderItem={_renderItem} data={slides} onDone={_onDone} />
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  image: {
    width: 250,
    height: 250,
    marginVertical: 33,
  },
  text: {
    color: 'white',
    marginTop: 24,
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
