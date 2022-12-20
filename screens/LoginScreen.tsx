import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import { setToken, getToken, getUsername, setUsername, setPassword, getPassword } from '../components/userTokenManager';
import useAuth from '../hooks/useAuth';
import { RootStackScreenProps } from '../types';
import ButtonForm from '../components/ButtonForm';
import FormInput from '../components/FormInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function LoginScreen({ navigation }: RootStackScreenProps<'CreateAccount'>) {
  const { signIn } = useAuth();


  return (  
    <KeyboardAwareScrollView style={styles.scroll}
       enableOnAndroid={true}
       extraHeight={0}
       enableResetScrollToCoords={false}
       bounces={false}
       keyboardOpeningTime={0}
       >
   < View style={styles.container}>  
      <Image style={styles.logo}
           resizeMode={'contain'}
           source={require('../assets/images/logo.png')}
           />
      <FormInput
        //value={username}
        placeholderText="Enter Username"
        onChange={(e) => {
          setUsername(e.nativeEvent.text)
         }}
        autoCapitalize='none'
        autoCorrect={false}
       />
      <FormInput
           // value={password}
            placeholderText="Enter Password"
             secureTextEntry={true}
             onChange={(e)=> {
              setPassword(e.nativeEvent.text);
            }}
            />
        <TouchableOpacity>
          <ButtonForm title='Sign In' onPress={signIn}/>
       </TouchableOpacity>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
           <View style={styles.signUp}>
            <Text>New user? Join here!</Text>
        <TouchableOpacity >
            <ButtonForm title='Create an Account' onPress={()=>{
                  navigation.navigate('CreateAccount')
                  }}/>
        </TouchableOpacity>
      </View>
     </View>
  </KeyboardAwareScrollView>
    
    
  )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#FBF0DF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
   logo: {
    marginTop: 20,
    width:250,
    height:200,
   
    resizeMode: 'contain',  
   },
  separator: {
    marginVertical: 15,
    height: 3,
    width: '80%',
  },
  signUp: {
    backgroundColor:'#FBF0DF',
     
  },
  scroll: {
    flex: 1,
    backgroundColor: '#FBF0DF'
  }
});
