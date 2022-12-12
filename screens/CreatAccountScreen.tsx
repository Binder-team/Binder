import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {  
    getUsername, 
    setUsername, 
    setPassword, 
    getPassword, 
    setCity, 
    setEmail, 
    getCity, 
    getEmail, 
    setPostalCode } from '../components/userTokenManager';
import axios from 'axios';
import Navigation from '../navigation';
import useAuth from '../hooks/useAuth';


export default function CreateAccountScreen({navigation}) {
    const { newUser } = useAuth();
    // const [city, setCity] = useState();
    // const [postalCode, setPostalCode] = useState();
    // const [email, setEmail] = useState();
  
  useEffect(()=>{
    console.log(getCity());
    console.log(getEmail());
    console.log(getUsername());
    console.log(getPassword());
  },[])
    
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please enter a username:</Text>
      <TextInput
        placeholder='enter username'
        onChange={(e)=>{
          setUsername(e.nativeEvent.text)
        }}
      >
      </TextInput>
      <Text style={styles.title}>Please enter a password:</Text>
      <TextInput
        placeholder='password'
        secureTextEntry={true} 
        onChange={(e)=>setPassword(e.nativeEvent.text)
       }
      >
      </TextInput>
      <Text style={styles.title}>city:</Text>
      <TextInput
        placeholder='city'
        onChange={(e)=>setCity(e.nativeEvent.text)
       }
      ></TextInput>
    <Text style={styles.title}>Postal code:</Text>
      <TextInput
        placeholder='i.e 123-4567'
        onChange={(e)=>setPostalCode(e.nativeEvent.text)
       }
      ></TextInput>
      
      <Text style={styles.title}>Please your email:</Text>
      <TextInput
        placeholder='email'
        onChange={(e)=>setEmail(e.nativeEvent.text)
       }
      >
      </TextInput>
     
      
    
    
    <TouchableOpacity>
        <Button title='SIGN UP' onPress={newUser}/>
    </TouchableOpacity>
    <TouchableOpacity>
        <Button title='go back' onPress={()=> navigation.goBack()}/>
    </TouchableOpacity>
</View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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