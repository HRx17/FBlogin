import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import {Pressable, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const items = [
  {
    title: 'facebook',
    icon: 'facebook-square',
    isSelected: false,
  },
  {
    title: 'Instagram',
    icon: 'instagram',
    isSelected: true,
  },
  {
    title: 'linkedin',
    icon: 'linkedin-square',
    isSelected: false,
  },
  {
    title: 'twitter',
    icon: 'twitter',
    isSelected: false,
  },
];
class SocialType extends React.PureComponent {
  render() {
    const {handlePress} = this.props;
    const _retrieveData = async () => {
      try {
        items_data = await AsyncStorage.getItem('socialData');
      } catch (error) {
        console.log(error, 'error');
        // Error retrieving data
      }
    };
    _retrieveData();

    return (
      <View
        style={{
          flex: 2,
          marginTop: '13%',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
          data={items}
          horizontal={true}
          keyExtractor={(item, index) => item.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handlePress(item, items)}
              style={styles.button}>
              <Icon name={item.icon} size={30} color={'black'} />
            </TouchableOpacity>
          )}></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
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
});

export default SocialType;
