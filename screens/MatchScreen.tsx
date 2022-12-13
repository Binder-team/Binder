// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookCard from '../components/BookCard';
import { Book } from '../types';
import { getUsername } from '../components/userTokenManager';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { Card } from 'react-native-paper';


export type Props = {
  book: Book,
  BookItem: Function,

}

export default function MatchScreen({ book, BookItem }: Props) {
  const [matchedBooks, setMatchedBooks] = useState([]);
 

  const getMatchedBooks = async () => {
    try {
 const fetchMatch = await axios.get(
      `https://binderapp-server.herokuapp.com/api/matches/${getUsername()}`,
      );
      const matches = await fetchMatch.data;
      console.log(matches);
      setMatchedBooks(matches);
    } catch (err)  {
    console.log(err);  
  } 
}
   

  useEffect(() => {
    getMatchedBooks();
  },[])


   const oneBook = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.bookContainer}>
        
        <Image
          style={{
             borderColor: 'blue',
            borderWidth: 2,
            height: 80,
            width: 80,
          }}
          source={{
            uri: item.thumbnail_url,
            width: 50,
            height: 50,
          }}
        />
      </View>
      <View>
        <Text>Title:{item.title}</Text>
        <Text>Author:{item.author}</Text>
        <Text>Condition:{item.condition}</Text>
        <Text>User:{}</Text>
        <Text>Contact:{}</Text>
         
      </View>   
    </View>
  );
  const itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <SafeAreaView style={styles.root}>

      <Text style={{fontWeight:'bold', fontSize: 20}}>New Matches</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style= {styles.matchContainer}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>You got a match!</Text>
        <View >
          <FlatList
              numColumns={2}
              data={matchedBooks}
              renderItem={oneBook}
              keyExtractor={item => item.id }
              ItemSeparatorComponent={itemSeparator}
               >            
          </FlatList> 
        </View>
      </View>
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
  matchContainer:{
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }, 
  bookContainer: {
    backgroundColor: 'D9D9D9',
    borderRadius: 100,
    height: 89,
    width: 89,
    justifyContent: 'center',
    alignItems: 'center',

  },
   item: {
     flexDirection: 'row',
    alignItems: 'center',
    paddingVetrical: 13,
   }
});
