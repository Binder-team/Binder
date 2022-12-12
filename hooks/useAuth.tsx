import React, { useEffect, useRef, useState, useContext, createContext  } from 'react';
import { Alert } from 'react-native';
import {setToken, getToken, setUsername, getUsername, setPassword, getPassword, resetToken } from '../components/userTokenManager'
import axios from 'axios'
const AuthContext = createContext({});
import Navigation from '../navigation/index';
import LoginScreen from '../screens/LoginScreen';

export const AuthProvider = ({children, setAuthenticated, authenticated}) => {
    // const [authenticated, setAuthenticated] = useState(false);
   //may have to create a state variable here, bc if token gets updated, that equals to getToken()
   
    // const username = getUsername();
    // const password = getPassword();
    
   
    const signIn =  async () => {
        try{
            const username = getUsername();
            console.log("username in useAuth login", username)
            const res = await axios.post('https://binderapp-server.herokuapp.com/api/login', {username});
            const data = await res.data;
            if(res.status === 200) {
                setToken(data)
                console.log(getToken())
                setAuthenticated(true);
                // Alert.alert(`Welcome, ${username}!`)
            } else {
                console.log("failed")
            }
        } catch {
            Alert.alert("Could not find user, please try again!")
        }
    }
const signOut = () => {
    resetToken();
    setAuthenticated(false);
}

    return (
        <AuthContext.Provider

            value={
                {
                    user: getToken(),
                    signIn,
                    signOut
                }
            }>
                {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}