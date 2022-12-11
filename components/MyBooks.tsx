import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';

import axios from 'axios';

import {Book} from '../types';
import { getUsername } from "./userTokenManager";

export type Props = {
  book: Book;
  BookItem: Function;
};

const MyBooks: React.FC<Props> = ({book, BookItem}) => {
  const [data, setData] = useState<[]>([]); //where all user's books get stored, as an array

  //axios get all books from user using 'https://binderapp-server.herokuapp.com/api/user_books'
  //it's going to be stored in the state, data, then
  //in the return statement, map through array to render

  const handleFetch = async() => {
    const fetchedUser = await axios.post(`https://binderapp-server.herokuapp.com/api/user_books/user/${getUsername()}`);
    const id = fetchedUser.data.id;
    const res = await axios.get(`https://binderapp-server.herokuapp.com/api/user_books/user/${id}`);
    const data = res.data;
    setData(data);
    console.log(data);
  };

  useEffect(() => {
    handleFetch();
  }, []);
  //map over data
  // const showBooks = data.map(obj => {
  //   return (
  //     <View key={obj['id']}>
  //       <View>
  //         <Image source={{uri: obj['thumbnail_url'], width: 50, height: 50}} />
  //       </View>

  //       <Text>Title:{obj['title']}</Text>
  //       <Text>Author:{obj['author']}</Text>
  //       <Text>Condition:{obj['condition']}</Text>
  //     </View>
  //   );
  // });
  //console.log(showBooks);

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
    <SafeAreaView>
      <FlatList
        //horizontal
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{height: 200}}
        //contentContainerStyle={{paddingBottom: 30}}
        persistentScrollbar
        //contentContainerStyle={{marginBottom: 20}}
        data={data}
        renderItem={oneBook}
        ItemSeparatorComponent={itemSeparator}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: StatusBar.currentHeight,
//   },
//   scrollView: {
//     backgroundColor: '#fff',
//     marginHorizontal: 30,
//   },
//   text: {
//     fontSize: 20,
//   },
// });

const styles = StyleSheet.create({
  // contentContainer: {
  //   //width: '100%',
  //   //flex: 1,
  //   // backgroundColor: '#121212',
  //   padding: 10,
  //   //paddingVertical: 20,
  // },
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

  // title: {
  //   fontWeight: 600,

  //   marginLeft: 13,
  // },
});

export default MyBooks;
