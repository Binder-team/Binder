import React, { useState, useEffect } from 'react';
import {Text, View,  StyleSheet, Image} from 'react-native';
import { Book } from '../types';
import axios from 'axios';
import { getUsername } from './userTokenManager';
import { Card } from 'react-native-paper';

   //===IMPORTANT===
  let index = 0;  //index should be declared outside of App to avoid duplicates.  
    //It's here for now and resets every time this loads

const BookCard =(props) => {
  const [bookData, setBookData] = useState([
    {
        "id": 7,
        "user_id": 3,
        "book_id": "0",
        "is_available": true,
        "isbn": "9780439023481",
        "condition": 7,
        "image_url": null,
        "thumbnail_url": "http://books.google.com/books/content?id=Yz8Fnw0PlEQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        "title": "The Mungy Games",
        "author": "Suzanne Collins"
    },
    {
        "id": 8,
        "user_id": 3,
        "book_id": "0",
        "is_available": true,
        "isbn": "9781594631931",
        "condition": 8,
        "image_url": null,
        "thumbnail_url": "http://books.google.com/books/content?id=ykWQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        "title": "The Kite Runner",
        "author": "Khaled Hosseini"
    },
    {
        "id": 9,
        "user_id": 3,
        "book_id": "0",
        "is_available": true,
        "isbn": "0307762718",
        "condition": 6,
        "image_url": null,
        "thumbnail_url": "http://books.google.com/books/content?id=1EhPf1ZptXwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        "title": "Norwegian Wood",
        "author": "Haruki Murakami"
    }
  ]);

//changing to work by shift (or popping) the previous entry.  Should stop flicker

  const handleFetch = async() => {
    const res = await axios.get(`https://binderapp-server.herokuapp.com/api/user_books/swipe/${getUsername()}`);
    const data = await res.data;
    setBookData(data);
  };

const processNextBook = async() => {
  console.log("💦💤");
  console.log(bookData[0].title)
  bookData.shift();
  console.log(bookData[0].title);
  console.log("💦💤");
};

  useEffect(()=>{
    handleFetch();

//    console.log("❣");
  },[]);

  useEffect(()=>{
    //processNextBook();
    console.log("BookCards L76",props.index);
  },[props.index]);

    return (
      <View style={styles.container}>
        <Card style={styles.card}>
            <Image 
                style={styles.cardImage}
                source={{uri: `${bookData[ props.index ]["image_url"]}` }}
                 />
                     
                        
        </Card>
        <View style={styles.cardInner}>
         <Text style={styles.title}>{bookData[ props.index ]["title"]}</Text>
        <Text style={styles.description}>Condition: {bookData[ props.index ]["condition"]}</Text> 
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
      borderRadius: 2,
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

export default BookCard;

