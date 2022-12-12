// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Book } from '../types';
import { getUsername } from '../components/userTokenManager';
import axios from 'axios';


export type Props = {
  book: Book;
  BookItem: Function;
};

export default function GetMatches({ book, BookItem }: Props) {

  const [matchedBooks, setMatchedBooks] = useState({});


 //mach books fetch 
 ///now is likedBooks fetch func 
 const getMatchedBooks = async () => {
    const fetchLikes = await axios.get(
      `https://binderapp-server.herokuapp.com/api/trade_table/liked/${getUsername()}`,
      );
      console.log(fetchLikes)
    const likedBookIds = fetchLikes.data.map((book) => book.book_id);
    const likedBooks = likedBookIds.map(async id => {
      const bookObj = await axios.get(
        `https://binderapp-server.herokuapp.com/api/user_books/${id}`,
      );
      return bookObj.data;
    });

    setMatchedBooks(likedBooks);
  };



  useEffect(() => {
    getMatchedBooks();
  }, []);


  const oneBook = ({item}) => (
    <View style={styles.item}>
      <View style={styles.avatarContainer}>
        <Image
          style={{
            // borderColor: 'blue',
            // borderWidth: 2,
            borderRadius: 3,
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
        <Text style={styles.title}>Title:{item.title}</Text>
        <Text>Author:{item.author}</Text>
        <Text>Condition:{item.condition}</Text>
      </View>
    </View>
  );

 const itemSeparator = () => {
    return <View style={styles.separator} />;
  };


  return (
    <SafeAreaView style={styles.root}>
      <Text style={{fontWeight:'bold', fontSize: 24}}>New Matches</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
  


      <FlatList
        //horizontal
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{height: 200}}
        //contentContainerStyle={{paddingBottom: 30}}
        persistentScrollbar
        //contentContainerStyle={{marginBottom: 20}}
        matchedBooks={matchedBooks}
        renderItem={oneBook}
        ItemSeparatorComponent={itemSeparator}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

   separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CCC',
  },
  avatarContainer: {
    backgroundColor: 'D9D9D9',
    borderRadius: 100,
    height: 89,
    width: 89,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVetrical: 13,
  },

  avatar: {
    height: 55,
    width: 55,
  },
});


