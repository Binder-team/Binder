import React, { useEffect, useRef, useState } from 'react';
import { useContext, createContext } from 'react';
import {setToken, getToken} from '../components/userTokenManager'
import axios from 'axios'
import username from '../screens/LoginScreen'
const AuthContext = createContext({});
import Navigation from '../navigation/index';
export const AuthProvider = ({children, setAuthenticated}) => {
    // const [authenticated, setAuthenticated] = useState(false);
   //may have to create a state variable here, bc if token gets updated, that equals to getToken()
   
    
    const signIn = (username:string, password:string) => {
        // const res = await axios.post('https://binderapp-server.herokuapp.com/login', {username});
        // const data = await res.data;
        // if(res.status === 200) {
        //     setToken(data.token)
        //     setAuthenticated(true);
        // } else {
        //     console.log("failed")
        // }
        setToken(1)
        setAuthenticated(true);
        //post request with username and password to get back token
        //post request should take a body that contains email and password
        //if else condition, if 200 status, then setToken(res.data.token)
        //else, console.log("failed")
        //maybe, change the state of a new state variable
    }
    // useEffect(()=> {
    //     console.log("useeffect occurs: ",getToken())
    // },[authenticated])

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