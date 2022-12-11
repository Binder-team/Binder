import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Image, StatusBar, useWindowDimensions, Pressable } from 'react-native';
import { GestureDetector, GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import axios from 'axios';
import BookCard from './BookCard';
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
import { getToken, setToken } from './userTokenManager';



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

//Fake data 

/*
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
*/
// "imageLinks": {
//   "smallThumbnail": "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//   "thumbnail":      "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
//   "small":          "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api",
//   "medium":         "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=3&edge=curl&source=gbs_api",
//   "large":          "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=4&edge=curl&source=gbs_api",
//   "extraLarge":     "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=6&edge=curl&source=gbs_api"
//  },



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


//swipe card implementation start
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
});

//swipe card functions end

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
    //flex: 1,
    backgroundColor:'red'
  },
  animatedCard: {
    width: '80%',
    height: '70%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'blue',
  },
  nextCardContainer: {
   // ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    
    //flex: 1,
    //backgroundColor: 'green'
  },
});


export default Swipe;
