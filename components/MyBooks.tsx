import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, FlatList, Image } from "react-native";
import axios from 'axios';
import { getUsername } from "./userTokenManager";
import { Book } from '../types';

export type Props = {
  book: Book;
  BookItem: Function;
}

const MyBooks: React.FC<Props> =({ book, BookItem }) => {
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
    // console.log(data);
  };

  useEffect(()=>{
    handleFetch();
},[]);
//map over data
const showBooks = data.map((obj) => {
    return (
        
        <View key={obj["id"]}>
            <View>
                <Image source={{uri:obj["thumbnail_url"],width: 50, height: 50,}}/>
            </View>

            <Text>Title:{obj["title"]}</Text>
            <Text>Author:{obj["author"]}</Text>
            <Text>Condition:{obj["condition"]}</Text>
            <Text></Text>
        </View>
    )
})
    return (
       <View>
        {showBooks}
       </View> 
 
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default MyBooks;