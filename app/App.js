import React, { Component } from 'react'; 
import { 
  View,
  Text 
} from 'react-native'; 
import { AccessToken} from 'react-native-fbsdk-next'; 
import { getFeed } from './utils/graphMethods'; 

import styles from './styles'; 
import LoginPage from './components/LoginPage/index';

const result = "";

export default class App extends Component { 

    UNSAFE_componentWillMount() {
        this._checkLoginStatus();
    }

    async _checkLoginStatus ( ){ 
      result = await AccessToken.getCurrentAccessToken(); 
  
    getFeed((error, result) => this._responseInfoCallback(error,
      result)); 
    } 

  
  render() { 
    return (
      <View style={ styles.container }> 
      {result &&  
      <Text style = {{color: 'black'}}>Logged In</Text>
      }
      {!result && 
      <LoginPage feedd={getFeed}/>
      }
      </View> 
    ); 
  } 
  
  _responseInfoCallback (error, result) { 
    if (error) { 
      console.log('Error fetching data: ', error.toString()); 
      return; 
    } 

    console.log(result); 
  } 
}