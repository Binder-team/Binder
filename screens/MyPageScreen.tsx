import React, { useState, Component, FunctionComponent }from 'react';
import { StyleSheet, Button, TouchableOpacity } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from 'react-native';
import { useScrollToTop, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { RootTabScreenProps } from '../types';
import  LikedBooks from '../components/LikedBooks'
import MyBooks from '../components/MyBooks';
import Navigation from '../navigation';


//const Stack = createNativeStackNavigator();

 const MyPageScreen: FunctionComponent =() =>  {
   const likedBooks = LikedBooks();
   const myBooks = MyBooks();
  const [currentView, setCurrentView] = useState ("myBooks");

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: 'white', height: '100%'}}>

      <Text style={styles.title}> My Profile</Text>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.button}>
          <TouchableOpacity  onPress={() => setCurrentView("likedBooks")}>
          <Text>My Books</Text>
          </TouchableOpacity>
        </View>
        <View  style={styles.button}>
          <TouchableOpacity  onPress={() => {setCurrentView("myBooks")}} >
            <Text>Liked Books</Text>
          </TouchableOpacity>
        </View>
      </View>
      <EditScreenInfo path="/screens/AddBooksScreen.tsx" />
    </View>
    </View>
  )
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
  button: {
    flex: 1,
    alignItems: 'center',
    width: '100%', 
    height: 40,
    backgroundColor: '#008B8B',
    padding: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default  MyPageScreen;