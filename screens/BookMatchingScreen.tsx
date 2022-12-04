import { useState } from 'react'
import { StyleSheet, Image } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {PanGestureHandler} from 'react-native-gesture-handler';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { blue100 } from 'react-native-paper/lib/typescript/styles/colors';
import images from '../assets/images'
//this is the main page where user swipes on a book or not. for now, just two buttons
export default function BookMatchingScreen({ navigation }: RootTabScreenProps<'FindBookTab'>) {
  let image = require('../assets/images/book-cover1.jpg')
  const sampleBooks = [
    {
      id:1,
      img: image,
      uri:'https://books.google.com/books/content?id=GX0KAQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
    },
    {
      id:2,
      img:image,
      uri:'https://books.google.com/books/content?id=G2dNDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
    },
    {
      id:3,
      img:image,
      uri:'https://books.google.com/books/content?id=oDOlCgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    }
  ]
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find a book</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        <CardStack>
        {sampleBooks.map((item) => (
            <Card>
              <Image source={item.img}/>
            </Card>
          ))}
        </CardStack>
      </View>
      <EditScreenInfo path="/screens/BookMatchingScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  content: {},
  card: {
    flex:1,
    color: 'blue'
  },
  label: {}
});
