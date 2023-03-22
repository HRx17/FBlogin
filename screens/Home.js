import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  AppRegistry,
  StyleSheet, 
  View,
  Alert,
  Modal,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native'; 
import Icon from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';



const dimentions = Dimensions.get('screen');

const Home  = ({navigation}) => {


  let tkn;
  let username;
  let userid;
  let instaid;
  let instatoken;

  useEffect(()=> {
    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('isLoggedIn');
        tkn = await AsyncStorage.getItem("accessToken");
        userid = await AsyncStorage.getItem("userId");
        username = await AsyncStorage.getItem("name");
        instaid = await AsyncStorage.getItem("instaUserId");
        instatoken = await AsyncStorage.getItem("instatoken");

        if (value === "true") {
          console.log(instaid);
          // let's go 
        }else {
          console.log("false");
        }
      } catch (error) {
        console.log(error,"error");
        // Error retrieving data
      }
   };
    _retrieveData();
  }, []);
  let tmp = 0;
  const [postData,setpostData] = useState();
  const [profileData,setprofileData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  logOut = () => {
    AsyncStorage.setItem('isLoggedIn', "false");
    navigation.navigate('Login');
    console.log("logout");
  }

  loadInstaPosts = () => {
    axios.get(`https://graph.instagram.com/${instaid}/media?fields=id,media_type,media_url,username,timestamp,caption&access_token=${instatoken}`)
    .then(response=> {
      return console.log(response);
    }).catch(error=> {
      return console.log(error);
    })
  }

  loadPosts = () => {
      tmp=1;
      console.log("entered");
//2102944419904876
/* make the API call */
        const info = new GraphRequest(`/${userid}/?fields=picture`,null,_profileResponse);
        new GraphRequestManager().addRequest(info).start();
        const infoRequest = new GraphRequest(`/${userid}/posts?fields=message,created_time,id,full_picture,status_type,source`,null,_responsePostCallback);
        new GraphRequestManager().addRequest(infoRequest).start();
  }

  const _profileResponse = (error,result) => {
    if (error) { 
      console.log('Error fetching Profiledata: ', error.toString()); 
      return; 
    }
    try {
      setprofileData(result.picture.data);
      return console.log(result.picture.data);
    }catch (e) {
      return e.printStackTrace();
    }
  }

  const _responsePostCallback =  (error, result) => {
    if (error) { 
      console.log('Error fetching Postdata: ', error.toString());
      return; 
    }
    try {
      setpostData(result.data);
      return console.log(result.data);
    }catch (e) {
      return e.printStackTrace();
    }
  }
 
  if(tmp === 0){
    console.log("loaded");
    //return loadPosts();
  }
    return (
      <React.Fragment> 
      <View style={{flex: 1, backgroundColor: '#f7f7f7'}}>
      <View style={ styles.container }>
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
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>Logout of all platforms at once</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                logOut();
                setModalVisible(!modalVisible)}}>
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

      <View style={{height: 50, weight: 100, flexDirection: 'row',backgroundColor: '#f7f7f7', marginBottom: 0, marginTop: 170}}>
        <Image source={require("../assets/images/logo.png")} style={{height: 40, width: 40,borderRadius: 200, marginLeft: 10, marginTop: 10}}/>
          <TouchableOpacity
          style={{marginLeft: 10, height: 32, weight: 30, marginLeft: 300, marginTop: 13}}
          onPress={() => setModalVisible(true)}>
            <Icon name="logout" size={30} color="black" />
          </TouchableOpacity>
      </View>
      <View style={{width: 350, backgroundColor: '#f7f7f7'} }>
        <Text style={styles.textbold}> Hi {username},</Text>
        <Text style={styles.textb}> Welcome to your personal post scheduler</Text>
      </View>
      <View style={{marginTop: 30, backgroundColor: '#f7f7f7'}}>
        <ScrollView horizontal={true} >
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {loadPosts();}}>
            <Icon name="facebook-square" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.icon}
          onPress={() => {loadInstaPosts();}}>
            <Icon name="instagram" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.icon}
          onPress={() => {}}>
            <Icon name="linkedin-square" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.icon}
          onPress={() => {}}>
            <Icon name="twitter" size={25} color="black" />
          </TouchableOpacity>
        </ScrollView>
      </View>
      </View>
      <View style={{flex: 3,marginBottom: 20,backgroundColor: '#f7f7f7'}}>
        <ScrollView alwaysBounceVertical={false}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Text style={{flex: 1, width: 50, textAlign: 'left', marginLeft: 30, fontSize: 18,fontWeight: 'bold', color: 'black', fontFamily: 'monospace' }}>
            Posts
          </Text>
          <TouchableOpacity
          style={{marginRight: 30}}
          onPress={() => {navigation.navigate("SeeAll", {profile: profileData, item: postData})}}>
            <Icon name="ellipsis1" size={25} color="black" />
          </TouchableOpacity>
        </View>
        {postData &&
        <FlatList data={postData.slice(0,15)}
        horizontal={true}
        keyExtractor={(item, index) => item.toString()}
        initialNumToRender={10}
        renderItem={({item})=> (
        <View style={[styles.card, styles.elevation]}>
          <View style={{borderColor: 'grey',borderBottomWidth: 1, height: 30, width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
            <Image style={{height: 25, width: 25, marginTop: 0, borderRadius: 50, marginRight: 200}}source={{uri: profileData.url}}/>
          </View>
          <Text style={[styles.textb,{marginRight: 120, alignSelf: 'stretch'}]}>{item.message}</Text>
          <Image style={{margin: 3, height: 150, width: 150, borderRadius: 8, alignSelf: 'center'}} source={item.full_picture ? {uri: item.full_picture} : require('../assets/images/Default_Image.png')}/>
          <Text style={{color: 'black', fontFamily: 'monospace', fontSize: 7, marginTop: 5, marginRight: 60}}>{item.created_time}</Text>
        </View>
        )
        }
        >
        </FlatList>
        }
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 0}}>
        <Text style={{flex: 1, width: 50, textAlign: 'left', marginLeft: 30, fontSize: 18,fontWeight: 'bold', color: 'black', fontFamily: 'monospace' }}>
            Scheduled Posts
          </Text>
          <TouchableOpacity
          style={{marginRight: 30}}
          onPress={() => {}}>
            <Icon name="ellipsis1" size={25} color="black" />
          </TouchableOpacity>

        </View>
        <FlatList>
          
        </FlatList>
        </ScrollView>
      </View>
      </View>
      </React.Fragment> 
    ); 
  }

export default Home;

const styles = StyleSheet.create({ 
  viewStyleForLine: {
    borderBottomColor: "black", 
    borderBottomWidth: StyleSheet.hairlineWidth, 
    alignSelf:'stretch',
    marginBottom: 440,
    width: "100%"
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
    backgroundColor: "#f7f7f7",
    borderRadius: 6,
    shadowOpacity: 1,
    shadowColor: 'black',
  },
  container: { 
    flex: 2, 
    justifyContent: 'center', 
    alignItems: 'center',  
    backgroundColor: '#f7f7f7'
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
    fontFamily: 'monospace'
  },
  textb: {
    color: 'black',
    fontSize: 11,
    marginLeft: 14,
    marginTop: 5,
    textAlign: 'left',
    fontFamily: 'monospace'
  }
}); 
AppRegistry.registerComponent('Home',Home);

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