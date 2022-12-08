import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { setToken, getToken } from '../components/userTokenManager';
import axios from 'axios';
//on click, call a function that verifies if user exists
//this is the main page where user swipes on a book or not. for now, just two buttons
//when submit is clicked, check if token matches a user, then login 
//if it matches a user's token, attach 
//if token is still null, then the user 
export default function LoginScreen() {
  const [username, setUsername] = useState<string|null>(null);
  const [email, setEmail] = useState<string|null>(null);
  
  const verifyUser = async() => {
    const res = await axios.post('');
    const data = res.data;
    setToken(data);
    //get request a body, that has the token in it, 
    //wait for response
    //if 200 status, check body for user_id 
  }
  //if getToken isn't null, then navigate to the app

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please enter your username:</Text>
      <TextInput placeholder='name' onChange={()=> setUsername()}></TextInput>
      <Text style={styles.title}>Please enter your password:</Text>
      <TextInput placeholder='password'></TextInput>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/BookMatchingScreen.tsx" />
    
    
    <TouchableOpacity>
        <Button title='SUBMIT' />
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
