import React, { useState, useEffect } from 'react';
import {Text, View,  StyleSheet, Image} from 'react-native';
import { Book } from '../types';
import axios from 'axios';
import { getUsername } from './userTokenManager';
import { Card } from 'react-native-paper';

   //===IMPORTANT===
  let index = 0;  //index should be declared outside of App to avoid duplicates.  
    //It's here for now and resets every time this loads

const BookCard = (bookCardProp) => {
  const [bookData, setBookData] = useState([]);
  useEffect(()=>{
    setBookData(bookCardProp);
    console.log("Prop", bookCardProp["bookData"]);
    console.log("BookCards title", bookCardProp["bookData"]["title"]);
  },[]);

    return (
      <View style={styles.container}>
        <Card style={styles.card}>
            <Image 
                style={styles.cardImage}
                source={{uri: `${bookCardProp["bookData"]["image_url"]}` }}
                />
              
        </Card>
        <View style={styles.cardInner}>
        <Text style={styles.title}>{bookCardProp["bookData"]["title"]}</Text>
        <Text style={styles.description}>Condition: {bookCardProp["bookData"]["condition"]}</Text> 
        </View>
        </View> 
        
    );
};

const styles = StyleSheet.create({

  container:{
    flex:1,
    width:'100%',
    height:'100%'
  },
    card: {
      //position:"absolute",
      //flex: 1,
      width: '100%',
      height: '100%',
      borderRadius: 5,
      backgroundColor: '#fefefe',
      shadowColor: '#000',
      shadowOffset: {
      width: 0,
      height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 5,
      borderColor: 'lightgrey',
        
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
        //marginTop: 2,
    },
    cardInner: {
        justifyContent:'center',
        alignItems:'center',
    },
    title: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        padding: 5,
        marginLeft: 10,
    }, 
    description: {
        fontSize: 18,
        color: 'black',
        lineHeight: 20,
        padding: 5,
        marginLeft: 10,
    }   
});

// BookCard.propTypes = {
//   "id": Number,
//   "userId": Number,
//   "book_id": any,
//   "isAvailable": boolean,
//   "isbn": any,
//   "condition": "　",
//   "description": "　",
//   "image_url": "../assets/images/Loading_icon.gif",
//   "thumbnail_url": "../assets/images/Loading_icon.gif",
//   "title": "Loading Books",
//   "author": "　",
// }

export default BookCard;

