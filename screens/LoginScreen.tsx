import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { setToken, getToken, getUsername, setUsername, setPassword, getPassword } from '../components/userTokenManager';
import axios from 'axios';
import Navigation from '../navigation';
import useAuth from '../hooks/useAuth';


//on click, call a function that verifies if user exists
//this is the main page where user swipes on a book or not. for now, just two buttons
//when submit is clicked, check if token matches a user, then login 
//if it matches a user's token, attach 
//if token is still null, then the user 
export default function LoginScreen() {
  // const [username, setUsername]= useState<string|null>();
  // const [password, setPassword]=useState<string|null>();
  // const password = useRef<HTMLInputElement|null>(null);
  // const username = useRef<HTMLInputElement|null>(null);
  // const [authenticated, setAuthenticated] = useState(false);
  const { signIn } = useAuth();
   
  // function handleSetUsername(event: ChangeEvent<{ value: string }>) {
  //   event.preventDefault();
  //   setUsername(event.target.value)
  // }

  // function handleSetPassword(event: React.MouseEvent<HTMLElement>) {
  //   event.preventDefault();
  //   setPassword(event.target.value)
  // }

  // useEffect(()=>{
  //  console.log("username is: ", username)
  //  console.log("password is: ", password)
  // },[username])

console.log("console log:", getUsername());
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
      <EditScreenInfo path="/screens/BookMatchingScreen.tsx" />
    
    
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
