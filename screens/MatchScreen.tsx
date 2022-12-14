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
   //const matched =  [{"author1": "Leo Tolstoy", "author2": "John Green", "book1Id": 11, "book2Id": 2, "condition1": "7", "condition2": "10", "id": 852, "thumbnail1": "http://books.google.com/books/publisher/content?id=14OMEAAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71uZt2FlO4Wbt6r-LWKb6ldD8lipyaKjqH7HA55Gx3PdnA7ysYLHXsMUCA_eEyzhExr-tWzhMRJup_0u-5RCbXvrBlzfGYrZX6pmzfdss9C2e-J7uG8sjK5aIAV3slXD-59xufI&source=gbs_api", "thumbnail2": "http://books.google.com/books/content?id=p0FWswEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE713m1kdtscDsTxUJVnJHMNRuXQ1faJsIZ9cNCnpevvwzaICjFIJAd6rd8odjnKxGUXE_aM7-vlOwjhubp-fODqku5uKly_mKg0BSH69hgQgTNhiZeD_Yt7z33v_NRlpIj83kf1O&source=gbs_api", "title1": "Penguin Classics Anna Karenina", "title2": "Turtles All the Way Down", "user1Id": 4, "user2Id": 1, "username1": "Angelica", "username2": "Ed"}];

  useEffect(() => {
    getMatchedBooks();
  },[])


   const tradeBook = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.bookContainer}> 
        <Image
          style={{
             borderColor: 'black',
            borderWidth: 2,
            height: 100,
            width: 100,
          }}
          source={{
            uri: item.thumbnail1,
            width: 50,
            height: 50,
          }}
        />
         <Text>Title:{item.title1}</Text>
        <Text>Author:{item.author1}</Text>
        <Text>Condition:{item.condition1}</Text>
        <Text>User:{item.username1}</Text>
        <Text>Contact:{item.email1}</Text> 
      </View>  
      <View style={styles.bookContainer}>
        
        <Image
          style={{
             borderColor: 'black',
            borderWidth: 2,
            height: 100,
            width: 100,
          }}
          source={{
            uri: item.thumbnail2,
            width: 50,
            height: 50,
          }}
        />
        <Text>Title:{item.title2}</Text>
        <Text>Author:{item.author2}</Text>
        <Text>Condition:{item.condition2}</Text>
        <Text>User:{item.username2}</Text>
        <Text>Contact:{item.email2}</Text>
      </View>
    </View>
  );


  const itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <SafeAreaView style={styles.root}>
       <Text style={styles.title}>New Matches</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
          <Text style={styles.text}>You got a match!</Text>
        </View>
      <View style= {styles.matchContainer}> 
        <View >
          <FlatList
              numColumns={4}
              data={matchedBooks}
              renderItem={tradeBook}  
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
    justifyContent: 'center',
    //backgroundColor:'green',
  },
  title: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    
  },
  matchContainer:{
    width:'100%',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    //backgroundColor:'red',
  }, 
  bookContainer: {
    //backgroundColor: 'D9D9D9',
    borderRadius: 20,
    // height: 300,
    width: '50%',
    justifyContent: 'center',
    // flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: 'yellow',

  },
   item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    flexWrap: 'wrap',
    //backgroundColor:'blue',
   }, 
   text: {
    alignItems:'flex-start',
    justifyContent: 'center',
    fontSize: 20, 
    fontWeight: 'bold', 
    alignSelf: 'center'
   }
   
});
