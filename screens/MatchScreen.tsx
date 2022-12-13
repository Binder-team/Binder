// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookCard from '../components/BookCard';
import { Book } from '../types';
import { getUsername } from '../components/userTokenManager';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';


export type Props = {
  book: Book,
  BookItem: Function,
  getUsername: Function

}

export default function MatchScreen({ book, BookItem, getUsername}: Props) {
  const [matchedBooks, setMatchedBooks] = useState([]);
 

  return (
    <SafeAreaView style={styles.root}>

      <Text style={{fontWeight:'bold', fontSize: 24}}>New Matches</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

    <ScrollView>
      <View style= {styles.matchContainer}>
        <Text>You got a match!</Text>
        <View >
          


        </View>


      </View>
    </ScrollView>
    

    </SafeAreaView>
  );
}





const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
    //alignItems: 'center',
    //justifyContent: 'center',
    //backgroundColor:'green',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  matchContainer :{
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
