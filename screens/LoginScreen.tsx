import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { setToken, getToken, getUsername, setUsername, setPassword, getPassword } from '../components/userTokenManager';
import axios from 'axios';
import Navigation from '../navigation';
import useAuth from '../hooks/useAuth';



export default function LoginScreen() {
  const { signIn } = useAuth();
   
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please enter your username:</Text>
      <TextInput
        placeholder='enter username'
        onChange={(e)=>{
          setUsername(e.nativeEvent.text)
        }}
      >
      </TextInput>
      <Text style={styles.title}>Please enter your password:</Text>
      <TextInput
        placeholder='password'
        secureTextEntry={true} 
        onChange={(e)=>setPassword(e.nativeEvent.text)
       }
      >
      </TextInput>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
    
    
    <TouchableOpacity>
        <Button title='SUBMIT' onPress={signIn}/>
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
