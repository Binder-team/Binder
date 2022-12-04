import React, { Component } from 'react';
import { StyleSheet, Button, TouchableOpacity } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
// import { RootTabScreenProps } from '../types';




export default function MyPageScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
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
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/AddBooksScreen.tsx" />
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