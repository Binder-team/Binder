import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { setToken, getToken, getUsername, setUsername, setPassword, getPassword, username } from '../components/userTokenManager';
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
              console.log(e)
;              setPassword(e.nativeEvent.text)
            }}
            />
             <TouchableOpacity>
        <ButtonForm title='Sign In' onPress={signIn}/>
    </TouchableOpacity>
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    <Text>New user? Join here</Text>
    <TouchableOpacity>
        <ButtonForm title='Create an Account' onPress={()=>{
          navigation.navigate('CreateAccount')
        }}/>
    </TouchableOpacity>
    </View> 
)};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#F3F3F3',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
