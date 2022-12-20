import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import { Text, View } from '../components/Themed';
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
import ButtonForm from '../components/ButtonForm';
import FormInput from '../components/FormInput';


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
      <Text style={styles.title}>Create an Account</Text>
      <FormInput
        placeholder='Enter Username'
        onChange={(e)=>{
          setUsername(e.nativeEvent.text)
        }}
      />
      <FormInput
        placeholder='Password'
        secureTextEntry={true} 
        onChange={(e)=>setPassword(e.nativeEvent.text)
       }
      />
      <FormInput
        placeholder='City'
        onChange={(e)=>setCity(e.nativeEvent.text)
       }
      />
      <FormInput
        placeholder='i.e 123-4567'
        onChange={(e)=>setPostalCode(e.nativeEvent.text)
       }
     />
      
      <FormInput
        placeholder='E-mail'
        onChange={(e)=>setEmail(e.nativeEvent.text)
       }
      />    
    <TouchableOpacity>
        <ButtonForm title='Sign up' onPress={newUser}/>
    </TouchableOpacity>
    <TouchableOpacity>
        <ButtonForm title='Go back' onPress={()=> navigation.goBack()}/>
    </TouchableOpacity>
</View>

  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#F9F2ED',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      padding: 20,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });