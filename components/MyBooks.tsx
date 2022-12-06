import React, { useState } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import axios from 'axios'
import BookItem  from '../components/BookItem';
import { Book } from '../types';

export type Props = {
  book: Book;
  BookItem: Function;
}

const MyBooks: React.FC<Props> =({ book }) => {
  
  
    return (
       <View>
            <Text>
                This is the My Books list
            </Text>
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