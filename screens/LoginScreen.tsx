import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Text, View } from '../components/Themed';
import { setToken, getToken, getUsername, setUsername, setPassword, getPassword } from '../components/userTokenManager';
import axios from 'axios';
import Navigation from '../navigation';
import useAuth from '../hooks/useAuth';
import { RootStackScreenProps } from '../types';
import ButtonForm from '../components/ButtonForm';
import FormInput from '../components/FormInput';




export default function LoginScreen({ navigation }: RootStackScreenProps<'CreateAccount'>) {
  const { signIn } = useAuth();
  
  return (
    <View style={styles.container}>
           <Image
           style={styles.logo}
           resizeMode={'contain'}
           source={require('../assets/images/logo-transparent.png')}
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
    <Text>New user? Join here!</Text>
    <TouchableOpacity>
        <ButtonForm title='Create an Account' onPress={()=>{
          navigation.navigate('CreateAccount')
        }}/>
    </TouchableOpacity>
    </View> 


  )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 150,
    backgroundColor:'#F9F2ED',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
   logo: {
    flex: 1,
    alignSelf: 'center',
    width:'70%',
   // height: 10,
   // aspectRatio: 1,
    resizeMode: 'contain',  
   },
  separator: {
    marginVertical: 15,
    height: 3,
    width: '80%',
  },
});
