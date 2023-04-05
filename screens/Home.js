import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel';
import {RootSiblingParent} from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';

import {
  AppRegistry,
  StyleSheet,
  View,
  StatusBar,
  Alert,
  Modal,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native';
import {FlatList} from 'react-native';
import {GraphRequest, GraphRequestManager} from 'react-native-fbsdk-next';
import SocialType from '../components/SocialType';

const dimentions = Dimensions.get('screen');
const ip = 'vivacious-teal-gopher.cyclic.app';

const Home = ({route, navigation}) => {
  const [user, setUser] = useState('');
  const [id, setId] = useState('');
  const [fb, setFb] = useState('');
  const [insta, setInsta] = useState('');
  const [socialitem, setItem] = useState('');

  useEffect(() => {
    navigation.addListener('beforeRemove', event => {
      event.preventDefault();
    });

    const _retrieveData = async () => {
      try {
        var insta = await AsyncStorage.getItem('instatoken');
        var fb = await AsyncStorage.getItem('fbaccessToken');
        console.log(fb);
        setInsta(await AsyncStorage.getItem('instatoken'));
        setFb(await AsyncStorage.getItem('fbaccessToken'));

        setId(await AsyncStorage.getItem('Id'));
        console.log(id);
        axios
          .get(`https://${ip}/api/user/${await AsyncStorage.getItem('Id')}`)
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
  }, [navigation]);

  const [posts, setPosts] = useState();
  const [postData, setpostData] = useState();
  const [instaPost, setinstaPost] = useState();
  const [profileData, setprofileData] = useState();
  const [socials, setSocials] = useState('');
  const [isVisible, setModal] = useState(false);

  //Logout method
  logOut = () => {
    AsyncStorage.setItem('isLoggedIn', 'false');
    navigation.navigate('Login');
    console.log('logout');
  };

  //renders Post content
  _renderPost = ({item, index}) => {
    if (postData) {
      return (
        <View style={{margin: 5, height: 250, width: 300}}>
          <Image
            style={{
              margin: 3,
              height: 250,
              position: 'absolute',
              width: 300,
              borderRadius: 8,
              alignSelf: 'center',
            }}
            source={
              item.full_picture
                ? {uri: item.full_picture}
                : require('../assets/images/Default_Image.png')
            }
          />
          <View
            style={{
              position: 'relative',
              top: '80%',
              height: 60,
              alignItems: 'center',
              width: '100%',
              backgroundColor: '#727272F5',
            }}>
            <Text
              style={{
                alignItems: 'center',
                marginTop: 15,
                color: 'black',
                fontWeight: 'bold',
              }}>
              {item.message ? item.message : 'Post'}
            </Text>
          </View>
        </View>
      );
    }
    if (instaPost) {
      return (
        <View style={{margin: 5, height: 250, width: 300}}>
          <Image
            style={{
              margin: 3,
              height: 250,
              position: 'absolute',
              width: 300,
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
              top: '80%',
              height: 53,
              borderBottomStartRadius: 10,
              borderBottomEndRadius: 10,
              width: '100%',
              backgroundColor: 'rgba(220, 220, 220, 0.70)',
            }}>
            <Text
              style={{
                marginTop: 15,
                marginStart: '10%',
                color: 'black',
                fontWeight: 'bold',
              }}>
              {item.caption ? item.caption : 'Post'}
            </Text>
          </View>
        </View>
      );
    }
  };

  //Loads Instagram Posts
  loadInstaPosts = () => {
    if (insta) {
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
    } else {
      let toast = Toast.show('Please Connect with Instagram', {
        duration: Toast.durations.LONG,
      });
      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 2000);
    }
  };

  loadPosts = () => {
    if (fb) {
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
    } else {
      let toast = Toast.show('Please Connect with Facebook', {
        duration: Toast.durations.LONG,
      });
      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 2000);
    }
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

  function connectSocial() {
    if (socialitem.title == 'facebook') {
      try {
      } catch (err) {}
      console.log('connect fb');
    } else if (socialitem.title == 'Instagram') {
      console.log('connect insta');
    } else if (socialitem.title == 'linkedin') {
      console.log('connect twitter');
    } else if (socialitem.title == 'twitter') {
      console.log('connect twitter');
    }
  }
  function socialHandling(item, items) {
    if (item.title == 'facebook' && fb == null) {
      console.log('connect fb');
      setModal(!isVisible);
    } else if (item.title == 'Instagram' && insta == '') {
      console.log('connect insta');
      setModal(!isVisible);
    } else if (item.title == 'linkedin') {
      console.log('connect twitter');
      setModal(!isVisible);
    } else if (item.title == 'twitter') {
      console.log('connect twitter');
      setModal(!isVisible);
    }
    setSocials(items);
    setItem(item);
    console.log(item);
  }

  return (
    <RootSiblingParent>
      <React.Fragment>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="white"
          translucent={false}
        />
        {isVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModal(!isVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
                  Connect to {socialitem.title} platform
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    marginTop: 8,
                    textAlign: 'center',
                  }}>
                  You are not connected, kindly connect with {socialitem.title}{' '}
                  platform to continues
                </Text>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      connectSocial();
                      setModal(!isVisible);
                    }}>
                    <Text style={styles.textStyle}>Connect</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 130,
                      marginTop: 40,
                      borderRadius: 20,
                      padding: 10,
                      marginLeft: 16,
                      elevation: 0.5,
                    }}
                    onPress={() => setModal(!isVisible)}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
        {!posts && (
          <View style={styles.container}>
            <ActivityIndicator size="large" />
          </View>
        )}
        {posts && (
          <View style={styles.container}>
            <View
              style={{
                flex: 1,
                height: 50,
                weight: '100%',
                flexDirection: 'row',
                backgroundColor: 'white',
                marginBottom: 0,
                marginTop: 20,
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
            <View style={{flex: 14}}>
              <ScrollView alwaysBounceVertical={false}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  {posts && (
                    <View
                      style={{
                        marginTop: '12%',
                        justifyContent: 'center',
                      }}>
                      <Carousel
                        layout={'default'}
                        ref={ref => (this.carousel = ref)}
                        data={posts.slice(0, 5)}
                        sliderWidth={420}
                        itemWidth={320}
                        loop={true}
                        autoplay={true}
                        autoplayDelay={1000}
                        autoplayInterval={5000}
                        renderItem={this._renderPost}
                      />
                    </View>
                  )}
                </View>
                <SocialType handlePress={socialHandling} />
                <View
                  style={{flex: 2, marginBottom: 20, backgroundColor: 'white'}}>
                  <ScrollView alwaysBounceVertical={false}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: '5%',
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
                        style={{marginRight: 16, flexDirection: 'row'}}
                        onPress={() => {
                          navigation.navigate('SeeAll', {
                            item: posts,
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
                        <Image
                          style={{
                            height: 10,
                            width: 10,
                            marginTop: 5,
                            marginLeft: 6,
                          }}
                          source={require('../assets/images/greaterthan.png')}
                        />
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
                    )}
                  </ScrollView>
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </React.Fragment>
    </RootSiblingParent>
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
