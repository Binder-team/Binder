import React from 'react';
import {Text, View, ImageBackground, StyleSheet, Image} from 'react-native';
import { Book } from '../types';

interface CardProps {
    image: String;
    book: Book;

}
 

 const BookCard : React.FC<CardProps>=({image}) => {
    return (
        <View style={styles.card}>
            <ImageBackground 
                source={{uri: image}}
                style={styles.cardImage}>
                    <View style={styles.cardInner}>
                        <Text style={styles.title}>Book Title</Text>
                        <Text style={styles.description}>Book description</Text>
                    </View>
            </ImageBackground>            
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
        color: 'white',
        fontWeight: 'bold',
    }, 
    description: {
        fontSize: 18,
        color: 'white',
        lineHeight: 25,
    }   
 });

 export default BookCard;

