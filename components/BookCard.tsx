import React, { useState, useEffect } from 'react';
import {Text, View, ImageBackground, StyleSheet, Image} from 'react-native';
import { Book } from '../types';
import axios from 'axios';
import { getUsername } from './userTokenManager';



//Fake data 
const profiles = [
  {
    name:"Count of Monte Cristo",
    condition: "1",
    pic:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.penguin.com.au%2Fcovers%2Foriginal%2F9789380028675.jpg&f=1&nofb=1&ipt=82eb3a11bd69c8e84218313a81993eb033b2f3d6997979e94ea97548923218fd&ipo=images"
  },
  {
    name:"Hitch Hiker's Guide to the Galaxy",
    condition: "10",
    pic:"../assets/images/splash.png"
  },
  {
    name:"Foundation",
    condition: "5",
    pic:"https://www.exampleimagelink2.png"
  },
  {
    name:"Wild Cards",
    condition: "3",
    pic:"https://www.exampleimagelink2.png"
  }
]


const books = [

  {
    "id": 0,
    "user_id": 3,
    "book_id": "0",
    "is_available": true,
    "isbn": "9780439023481",
    "condition": 7,
    "image_url": null,
    "thumbnail_url": "http://books.google.com/books/content?id=Yz8Fnw0PlEQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "title": "The Hunger Games",
    "author": "Suzanne Collins"
  }

]


 
   //===IMPORTANT===
  let index = 0;  //index should be declared outside of App to avoid duplicates.  
    //It's here for now and resets every time this loads

 const BookCard =(props) => {

  //console.log('props ',props);

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
  //const [profile, setProfile] = useState(bookData[0]);  //where all user's books get stored, as an array

  const handleFetch = async() => {
    const res = await axios.get(`https://binderapp-server.herokuapp.com/api/user_books/swipe/${getUsername()}`);
    const data = await res.data;
    setBookData(data);

    console.log(data);   
  };

  useEffect(()=>{
    handleFetch();
  },[]);

  const [bookPosition, setBookPosition] = useState(bookData[0]);


    return (
        <View style={styles.card}>
            <ImageBackground 
                source={{uri: `${bookData[index]["thumbnail_url"]}` }}
                style={styles.cardImage}>
                    <View style={styles.cardInner}>
                       
                    </View>
            </ImageBackground>  

             <Text style={styles.title}>{bookData[ index ]["title"]}</Text>
                        <Text style={styles.description}>Condition: {bookData[ index ]["condition"]}</Text>          
        </View>
    )
 }


 const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: '#fefefe',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,  
        
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    cardInner: {
        padding: 10,
    },
    title: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
    }, 
    description: {
        fontSize: 18,
        color: 'black',
        lineHeight: 25,
    }   
 });

 export default BookCard;

