
import { View, StyleSheet, Image, Text } from 'react-native';
import React from 'react';
import { Book } from '../types';
import axios from 'axios';


export type BookItemProps = {
    book: Book;
}


//Bookitem render function

const  BookItem: React.FC<BookItemProps> =({ book }) => {
  
  
  axios.get(`https://binderapp-server.herokuapp.com/api/user_books`,{
    params: {
        
    }
}).then((response) => {
  console.log(response.data);
});

    return  (
        <View style= {styles.container}>
            <Image source={ {uri: book.thumbnail_url}} style={styles.image} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{book.title}</Text>
                <Text>by {book.author}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
  },
  image: {
    flex: 1,
    aspectRatio: 2 / 3,
    marginRight: 10,
  },
  contentContainer: {
    flex: 4,
    borderColor: "lightgray",
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default BookItem;