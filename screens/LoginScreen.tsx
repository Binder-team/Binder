import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//import { useState, useRef } from 'react';
//import { StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { RootTabScreenProps } from '../types';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider';


//import { setToken, getToken } from '../components/userTokenManager';
import axios from 'axios';
import Navigation from '../navigation';
import useAuth from '../hooks/useAuth';


//on click, call a function that verifies if user exists
//this is the main page where user swipes on a book or not. for now, just two buttons
export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { login } = useContext(AuthContext);


  return (
      <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <FormInput
        value={email}
        placeholderText='Email'
        onChangeText={userEmail => setEmail(userEmail)}
        autoCapitalize='none'
        keyboardType='email-address'
        autoCorrect={false}
      />
      <FormInput
        value={password}
        placeholderText='Password'
        onChangeText={userPassword => setPassword(userPassword)}
        secureTextEntry={true}
      />
      <FormButton buttonTitle='Login' onPress={() => login(email, password)} />
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.navButtonText}>New user? Join here</Text>
      </TouchableOpacity>
    </View>
)};


/*
//when submit is clicked, check if token matches a user, then login 
//if it matches a user's token, attach 
//if token is still null, then the user 
export default function LoginScreen({username, password}) {

  const { signIn } = useAuth();
  // const password = useRef<HTMLInputElement>();
  // const username = useRef<HTMLInputElement>();
  
  
  function getUsername(event: React.MouseEvent<HTMLElement>) {
    console.log(username.current);
  }

  function getPassword(event: React.MouseEvent<HTMLElement>) {
    console.log(password.current);
  }

  // const verifyUser = async() => {
  //   const res = await axios.post('',{
  //     username: username,
  //     password: password,
  //   });
  //   const data = res.data;
  //   setToken(data);
    //get request a body, that has the token in it, 
    //wait for response
    //if 200 status, check body for user_id 
  // }
  //if getToken isn't null, then navigate to the app
console.log("token is: ",getToken());
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please enter your username:</Text>
      <TextInput 
        ref={username}
        placeholder='enter username' 
      >
      </TextInput>
      <Text style={styles.title}>Please enter your password:</Text>
      <TextInput 
        ref={password}
        placeholder='password'
        secureTextEntry={true} 
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
 */



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    marginBottom: 10
  },
  navButton: {
    marginTop: 15
  },
  navButtonText: {
    fontSize: 20,
    color: '#6646ee'
  }
});
