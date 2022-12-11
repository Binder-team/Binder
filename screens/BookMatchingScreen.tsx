import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Image, StatusBar, useWindowDimensions, Pressable } from 'react-native';
import { GestureDetector, GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import axios from 'axios';
import BookCard from '../components/BookCard'
import Animated, { 
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedGestureHandler,
  interpolate,
  withSpring,
  runOnJS,
  event
} from 'react-native-reanimated';
import { Book } from '../types';
import { getToken, setToken } from '../components/userTokenManager';

/*
const profiles = [
  {
    name:"John Doe",
    age:27,
    likes:["Hockey","Hiking"],
    pic:"https://www.exampleimagelink.png"
  },
  {
    name:"Alexis Texas",
    age:22,
    likes:["Parties","Bananas"],
    pic:"https://www.exampleimagelink2.png"
  },
  {
    name:"Jane Smith",
    age:35,
    likes:["Netflix","Wine"],
    pic:"https://www.exampleimagelink3.png"
  }
]
 */

export enum SWIPE_DIRECTION {
  LEFT = 'left',
  RIGHT = 'right',
  DEFAULT = 'default'
}

export interface Value {
  value : number;
}

export interface Props {
  //x: Value;
  onStart: () => void;
  onActive: () => void;
  onEnd: () => void;
  onSwipe : (direction: SWIPE_DIRECTION) => void;
}

export type AnimatedGHContext  = {
  startX: number;
}

const ROTATION = 60;
const SWIPE_VELOCITY = 800;


    //===IMPORTANT===
  let index = 0;  //index should be declared outside of App to avoid duplicates.  
    //It's here for now and resets every time this loads

const Swipe = ({
  onStart,
  onActive,
  onEnd,
  onSwipe, 
}: Props) => {

/*
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
        "title": "The Hunger Games",
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
]); //where all user's books get stored, as an array
*/


//handlerFunction
async function swipeRight (bookObj: Book) {
  await axios.post("https://binderapp-server.herokuapp.com/api/trade_tables", {
    sender: 1,
    receiver: bookObj.user_id,
    book_id: bookObj.book_id,
    is_matched: false,
    is_accepted:false,
    is_exchanged:false
  })
  await axios.post("https://binderapp-server.herokuapp.com/api/trade_tables/match", {
    sender: 1,
    receiver: bookObj.user_id,
    book_id: bookObj.book_id,
    is_matched: false,
    is_accepted:false,
    is_exchanged:false
  })
}

const [bookData, setBookData]= useState<Book[]>([]);
 
const [currentIndex, setCurrentIndex] = useState(0);
const [nextIndex, setNextIndex] = useState(currentIndex + 1);

const currentProfile = bookData[currentIndex];
const nextProfile = bookData[nextIndex];

const {width: screenWidth} = useWindowDimensions();

const hiddenSreenWidth = 2 * screenWidth; 

const sharedValue = useSharedValue(0);
const rotate = useDerivedValue(() =>  interpolate(
  sharedValue.value, [0, hiddenSreenWidth], [0, ROTATION]) +  'deg');

const cardStyle = useAnimatedStyle(() => ({
  transform: [{
    translateX: sharedValue.value,
  },
  {
    rotate: rotate.value,
  },
  ],
}));

const nextCardStyle = useAnimatedStyle(() => ({
  transform: [
    {
    scale: interpolate(sharedValue.value,
       [-hiddenSreenWidth, 0, hiddenSreenWidth],
        [1, 0.5, 1]
        ),
    },  
  ]
}))

const gestureHandler = useAnimatedGestureHandler ({
  onStart: (_, context: AnimatedGHContext) =>{
    //console.log('Touch start');
    context.startX = sharedValue.value;
  },
  onActive: (event, context: AnimatedGHContext) => {
    sharedValue.value = event.translationX;
    //console.log('Touch x: ', event.translationX);
  },
  onEnd: ()=>{
    //console.log('Touch end');

  }
})

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.pageContainer}>
      <View style={styles.nextCardContainer}>
        <Animated.View style={[styles.animatedCard,nextCardStyle]}>
           <BookCard bookData={nextProfile}/>
        </Animated.View>
        </View>
      <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.animatedCard,cardStyle]}>
              <BookCard bookData={currentProfile}/> 
          </Animated.View> 
      </PanGestureHandler>
      </View>    
   
    </GestureHandlerRootView>
  );
}



const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor:'red'
  },
  animatedCard: {
    width: '80%',
    height: '70%',
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'blue',
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    //width: '100%',
    //height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  
  },
});


export default Swipe;
