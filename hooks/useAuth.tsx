import React from 'react';
import { useState } from 'react';
import { useContext, createContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [token ,setToken] = useState(null);
    return (
        <AuthContext.Provider
            value={
                {
                   token, setToken
                }
            }>
                {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}