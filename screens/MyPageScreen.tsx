import React, { useState, Component, FunctionComponent }from 'react';
import { StyleSheet, Button, TouchableOpacity } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from 'react-native';
import { useScrollToTop, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { RootTabScreenProps } from '../types';


const Stack = createNativeStackNavigator();

 const MyPageScreen: FunctionComponent =() =>  {

  //const [currentView, setCurrentView] = useState ("currentView");

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: 'white', height: '100%'}}>

      <Text style={styles.title}> My Profile</Text>
      <View style={{ flexDirection: 'row' }}>
        <View >
          <TouchableOpacity style={styles.button}>
          <Text>My Books</Text>
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={styles.button}>
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
    width: '100%', 
    height: 30,
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