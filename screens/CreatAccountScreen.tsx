import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { setToken, getToken, getUsername, setUsername, setPassword, getPassword } from '../components/userTokenManager';
import axios from 'axios';
import Navigation from '../navigation';
import useAuth from '../hooks/useAuth';



export default function CreatAccountScreen() {
    const [city, setCity] = useState<string>("");
    const [postalCode, setPostalCode] = useState<string>("");
    const [email, setEmail] = useState<string>("");
  const { signIn } = useAuth();
  
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
      <Text style={styles.title}>Please your city:</Text>
      <TextInput
        placeholder='city'
        onChange={(e)=>setPassword(e.nativeEvent.text)
       }
      >
      </TextInput>
      <Text style={styles.title}>Please your email:</Text>
      <TextInput
        placeholder='email'
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