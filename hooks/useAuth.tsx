import React, { useEffect, useRef, useState, useContext, createContext  } from 'react';
import { Alert } from 'react-native';
import {setToken, getToken, setUsername, getUsername, setPassword, getPassword, getCity, getEmail, getPostalCode, resetToken } from '../components/userTokenManager'
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

const newUser = async () => {
    try{
        const username = getUsername();
        const res = await axios.post('https://binderapp-server.herokuapp.com/api/users',{
            username:username,
            city:getCity(),
            profile_url: 'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
            email:getEmail(),
            postal_code:getPostalCode(),
            is_banned:false
        });
        const data = res.data;
        console.log("new user data: ", data)
        if(res.status === 200) {
            signIn();
        }

    } catch {
        Alert.alert("Could not sign up, please try again!")
    }
}
    return (
        <AuthContext.Provider

            value={
                {
                    user: getToken(),
                    signIn,
                    signOut,
                    newUser
                }
            }>
                {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}