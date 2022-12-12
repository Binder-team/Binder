import React, { useEffect, useState }from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, Image } from 'react-native';
// import { RootTabScreenProps } from '../types';
import  LikedBooks from '../components/LikedBooks'
import MyBooks from '../components/MyBooks';
import BookItem from '../components/BookItem';
import { Book, RootStackParamList } from '../types';
import { resetToken, getUsername, username, getToken } from '../components/userTokenManager';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
// import { Image } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';


export type Props = {
  book: Book;
  BookItem: Function;
  MyBooks: Function;
  LikedBooks: Function;
  navigation: Function
}

const MyPageScreen = ({navigation:{reset}}) =>  {
  const { signOut } = useAuth();

  const [data, setData] = useState({})
  const [currentView, setCurrentView] = useState<string>("myBooks");
  const [logout, setLogout] = useState<boolean>(false);
  
  const  getProfile = async() => {
    const res = await axios.post(`https://binderapp-server.herokuapp.com/api/users/info`, 
    {
      "username": getUsername()
    });
    const data = res.data;
    setData(data);
    console.log(data);
    return data;
  }
  useEffect(()=>{
    console.log(getProfile())
    console.log(getUsername());
    console.log(`../assets/images/${getUsername()}.jpeg`)
  },[]) 
 


  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <TouchableOpacity 
            onPress={signOut}
            
        >
          <Text style={styles.logout}>Log out</Text>
        </TouchableOpacity>
      
      </View>
      <View style={{backgroundColor: 'white', height: '100%'}}>
      <Text style={styles.title}>My Profile</Text>
      <Image style={styles.image}source={{uri:'https://ca.slack-edge.com/T043EUUMPPD-U043X7CT3N0-532658af7329-512'}}></Image>
      <View style={styles.profileContainer}>
        <Text style={styles.username}>{data["username"]}</Text>
        <Text>city: {data["city"]}</Text>
        <Text>contact: {data["phone_number"]}</Text>
        <Text>rating: {data["reputation"]}</Text>
      </View>
      

      <View style={{ flexDirection: 'row' }}>
        <View style={styles.button}>
          <TouchableOpacity  onPress={() => setCurrentView("myBooks")}>
          <Text>My Books</Text>       
          </TouchableOpacity>         
        </View>      
        <View  style={styles.button}>
          <TouchableOpacity  onPress={() =>setCurrentView("likedBooks")} >
            <Text>Liked Books</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {currentView === "myBooks"? (
          <MyBooks/>
        ): (<LikedBooks/>)}
      </View>
    </View>
    </View>
  )
}


const styles = StyleSheet.create({
  image:{
    width:100,
    height:100,
    borderRadius:50,
  },
  username:{
    fontSize: 20,
  },
  profile:{
    margin: 10
  },
  profileContainer:{
    margin:15
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
    width: '100%', 
    height: 40,
    backgroundColor: '#5B8B8B',
    padding: 10,
    alignItems: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default  MyPageScreen;