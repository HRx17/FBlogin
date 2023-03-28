import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel';

import {
  AppRegistry,
  StyleSheet,
  View,
  StatusBar,
  Alert,
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

const dimentions = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [user, setUser] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const _retrieveData = async () => {
      try {
        var insta = await AsyncStorage.getItem('instatoken');
        var fb = await AsyncStorage.getItem('fbaccessToken');

        setId(await AsyncStorage.getItem('Id'));
        console.log(id);
        axios
          .get(
            `http://192.168.0.195:3000/api/user/${await AsyncStorage.getItem(
              'Id',
            )}`,
          )
          .then(response => {
            console.log(response.data.users);
            setUser(response.data.users);
            if (insta) {
              loadInstaPosts();
            } else if (fb) {
              loadPosts();
            }
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
  }, []);

  const [posts, setPosts] = useState();
  const [postData, setpostData] = useState();
  const [instaPost, setinstaPost] = useState();
  const [profileData, setprofileData] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  //Logout method
  logOut = () => {
    AsyncStorage.setItem('isLoggedIn', 'false');
    navigation.navigate('Login');
    console.log('logout');
  };

  //renders Post content
  _renderPost = ({item, index}) => {
    return (
      <View style={{margin: 10}}>
        <Image
          style={{
            margin: 3,
            height: 150,
            width: 150,
            borderRadius: 8,
            alignSelf: 'center',
          }}
          source={
            item.full_picture
              ? {uri: item.full_picture}
              : require('../assets/images/Default_Image.png')
          }
        />
      </View>
    );
  };

  //Loads Instagram Posts
  loadInstaPosts = () => {
    axios
      .get(
        `https://graph.instagram.com/${user.insta_userid}/media?fields=id,media_type,media_url,username,timestamp,caption&access_token=${user.insta_accessToken}`,
      )
      .then(response => {
        setpostData(null);
        setinstaPost(response.data.data);
        setPosts(response.data.data);
        return console.log(response.data);
      })
      .catch(error => {
        return console.log(error, 'here?');
      });
  };

  loadPosts = () => {
    tmp = 1;
    console.log('entered');
    //2102944419904876
    /* make the API call */
    const infoRequest = new GraphRequest(
      `/${user.fb_userid}/posts?fields=message,created_time,id,full_picture,status_type,source`,
      null,
      _responsePostCallback,
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  };

  const _responsePostCallback = (error, result) => {
    if (error) {
      console.log('Error fetching Postdata: ', error.toString());
      return;
    }
    try {
      setpostData(result.data);
      setPosts(result.data);
      //return console.log(result.data);
    } catch (e) {
      return console.log(e);
    }
  };

  return (
    <React.Fragment>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={false}
      />
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            height: 50,
            weight: '100%',
            flexDirection: 'row',
            backgroundColor: 'white',
            marginBottom: 0,
            marginTop: 0,
          }}>
          <Image
            source={require('../assets/images/logo.png')}
            style={{
              height: 40,
              width: 40,
              borderRadius: 200,
              marginRight: '5%',
            }}
          />
          <View
            style={{
              height: 40,
              marginTop: 3,
              marginRight: '50%',
              backgroundColor: 'white',
            }}>
            {user.username && (
              <Text
                style={{
                  color: 'black',
                  fontSize: 24,
                  fontFamily: 'Open Sans',
                }}>
                {' '}
                Hi, {user.username}
              </Text>
            )}
          </View>
        </View>
        <ScrollView alwaysBounceVertical={false}>
          <View style={{flex: 2, justifyContent: 'center'}}>
            {posts && (
              <View
                style={{
                  marginTop: '30%',
                  justifyContent: 'center',
                }}>
                <Carousel
                  layout={'default'}
                  ref={ref => (this.carousel = ref)}
                  data={posts}
                  sliderWidth={410}
                  itemWidth={250}
                  renderItem={this._renderPost}
                />
              </View>
            )}
          </View>
          <View
            style={{
              flex: 2,
              marginTop: '20%',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ScrollView horizontal={true}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  loadPosts();
                }}>
                <Icon name="facebook-square" size={25} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  loadInstaPosts();
                }}>
                <Icon name="instagram" size={25} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={() => {}}>
                <Icon name="linkedin-square" size={25} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={() => {}}>
                <Icon name="twitter" size={25} color="black" />
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={{flex: 2, marginBottom: 20, backgroundColor: 'white'}}>
            <ScrollView alwaysBounceVertical={false}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '10%',
                }}>
                <Text
                  style={{
                    flex: 1,
                    width: 50,
                    textAlign: 'left',
                    marginLeft: 24,
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'black',
                    fontFamily: 'monospace',
                  }}>
                  Scheduled Posts
                </Text>
                <TouchableOpacity
                  style={{marginRight: 16}}
                  onPress={() => {
                    navigation.navigate('SeeAll', {
                      profile: profileData,
                      item: postData,
                    });
                  }}>
                  <Text
                    style={{
                      color: '#1778f2',
                      fontSize: 14,
                      fontFamily: 'OpenSans',
                      fontWeight: 'bold',
                    }}>
                    View all
                  </Text>
                </TouchableOpacity>
              </View>
              {postData && (
                <FlatList
                  data={postData.slice(0, 15)}
                  horizontal={true}
                  keyExtractor={(item, index) => item.toString()}
                  initialNumToRender={10}
                  renderItem={({item}) => (
                    <View style={[styles.card, styles.elevation]}>
                      <View
                        style={{
                          borderColor: 'grey',
                          borderBottomWidth: 1,
                          height: 30,
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}></View>
                      <Text
                        style={[
                          styles.textb,
                          {marginRight: 120, alignSelf: 'stretch'},
                        ]}>
                        {item.message}
                      </Text>
                      <Image
                        style={{
                          margin: 3,
                          height: 150,
                          width: 150,
                          borderRadius: 8,
                          alignSelf: 'center',
                        }}
                        source={
                          item.full_picture
                            ? {uri: item.full_picture}
                            : require('../assets/images/Default_Image.png')
                        }
                      />
                      <Text
                        style={{
                          color: 'black',
                          fontFamily: 'monospace',
                          fontSize: 7,
                          marginTop: 5,
                          marginRight: 60,
                        }}>
                        {item.created_time}
                      </Text>
                    </View>
                  )}></FlatList>
              )}
              {instaPost && (
                <FlatList
                  data={instaPost}
                  horizontal={true}
                  keyExtractor={(item, index) => item.toString()}
                  initialNumToRender={10}
                  renderItem={({item}) => (
                    <View style={[styles.card, styles.elevation]}>
                      <View
                        style={{
                          borderColor: 'grey',
                          borderBottomWidth: 1,
                          height: 30,
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}></View>
                      <Text
                        style={[
                          styles.textb,
                          {marginRight: 120, alignSelf: 'stretch'},
                        ]}>
                        {item.caption}
                      </Text>
                      <Image
                        style={{
                          margin: 3,
                          height: 150,
                          width: 150,
                          borderRadius: 8,
                          alignSelf: 'center',
                        }}
                        source={
                          item.media_url
                            ? {uri: item.media_url}
                            : require('../assets/images/Default_Image.png')
                        }
                      />
                      <Text
                        style={{
                          color: 'black',
                          fontFamily: 'monospace',
                          fontSize: 7,
                          marginTop: 5,
                          marginRight: 60,
                        }}>
                        {item.timestamp}
                      </Text>
                    </View>
                  )}></FlatList>
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </React.Fragment>
  );
};

export default Home;

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
    height: 250,
    width: 250,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 6,
    shadowOpacity: 1,
    shadowColor: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
AppRegistry.registerComponent('Home', Home);
