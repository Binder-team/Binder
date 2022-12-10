import React, { createContext, ReactNode, useState } from 'react';
import auth from '@react-native-firebase/auth';



export type UserData = {
   email: 'string';
   password: 'string';
   token: 'string';
}

export type AuthData ={
  user: UserData | null;
  login: (email: string, password: string)=> Promise<void>;
  register:(email: string, password: string)=> Promise<void>;
  logout(): void; 
  setUser: Function;
}

export type AuthProviderProps = {
  children? : ReactNode
}


export const AuthContext = createContext<AuthData>({} as AuthData);

export const AuthProvider :React.FC= ({ children }: AuthProviderProps) => {

  const [user, setUser] = useState<UserData | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};