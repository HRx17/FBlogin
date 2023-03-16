import {AsyncStorage} from 'react-native-community/async-storage';
import {WebView} from 'react-native-webview';
const HomeScreen = (props, route, navigation) => {
const [isLoggedOut, setIsLoggedOut] = useState(false);
const {FName, LName, EmailId, ImageUri, From} = props.route.params;
const [userInfo, setUserInfo] = useState(null);
const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
const [fName, setfName] = useState(FName.replace(/['“]+/g, ''));
const [lName, setlName] = useState(LName.replace(/['“]+/g, ''));
const [email, setlEmail] = useState(EmailId.replace(/['“]+/g, ''));
const [from, setlFrom] = useState(From.replace(/['“]+/g, ''));
const [imageUrl, setImageUrl] = useState(props.route.params.ImageUri.replace(/['“]+/g, ''),);
const logoutFun = async () => {
 setIsLoggedOut(true);
 await AsyncStorage.setItem('ISLOGGEDIN', 'false');
 props.navigation.replace('LoginWithLinkedIn');
};
return (
<View style={styles.container}>
<Image
style={styles.images}
source={{uri: imageUrl}} 
/>
<Text style={styles.text}>{fName + ' ' + lName}</Text>
<Text style={styles.text}>{email}</Text>
<View style={{marginTop: 200}}>
{isLoggedOut === true && (
<View style={{width: 1, height: 1}}>
<WebView
 source={{uri: 'https://www.linkedin.com/m/logout'}}
 javaScriptEnabled
 domStorageEnabled
 sharedCookiesEnabled
/>
</View>
)}
</View>
</View>
);
};
const mapStateToProps = state => ({
linkedInInfo: state.LoginWithLinkedInReducer,
});
export default connect(mapStateToProps, {})(HomeScreen);