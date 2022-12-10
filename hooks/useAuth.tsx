import React, { useEffect, useRef, useState } from 'react';
import { useContext, createContext } from 'react';
import {setToken, getToken, setUsername, getUsername, setPassword, getPassword } from '../components/userTokenManager'
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
        const username = getUsername();
        console.log("username in useAuth login", username)
        const res = await axios.post('https://binderapp-server.herokuapp.com/api/login', {username});
        const data = await res.data;
        if(res.status === 200) {
            setToken(data)
            console.log(getToken())
            setAuthenticated(true);
        } else {
            console.log("failed")
        }
        // setToken("something");
        // setAuthenticated(true);
    }


    return (
        <AuthContext.Provider

            value={
                {
                    user: getToken(),
                    signIn
                }
            }>
                {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}