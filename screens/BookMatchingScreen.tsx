import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
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
import { getToken, setToken, resetToken, getUsername, setUsername, username, getPassword, setPassword } from '../components/userTokenManager';
import { Alert } from 'react-native';




export enum SWIPE_DIRECTION {
  LEFT = 'left',
  RIGHT = 'right',
  DEFAULT = 'default'
}

export interface Value {
  value : number;
}

export interface Props {
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
  //let index = 0;  //index should be declared outside of App to avoid duplicates.  
    //It's here for now and resets every time this loads

const Swipe = ({
  onStart,
  onActive,
  onEnd,
  onSwipe, 
}: Props) => {

const [bookData, setBookData] = useState([]); //where all user's books get stored, as an array
// const currentIndexRef = useRef(0);
// const nextIndexRef = useRef(currentIndexRef.current + 1);
const [currentIndex, setCurrentIndex] = useState(0);
const [nextIndex, setNextIndex] = useState(currentIndex + 1);
const [matchState, setMatchState] = useState();


const currentProfile = bookData[currentIndex];
console.log('current profile: ', currentProfile);
const nextProfile = bookData[nextIndex];
console.log('next profile: ', nextIndex);

const[profile, setProfile] = useState(currentProfile);
const [currentCard, setCurrentCard] = useState(bookData[currentIndex]);

const handleFetch = async() => {
    const res = await axios.get(`https://binderapp-server.herokuapp.com/api/user_books/swipe/${getUsername()}`);
    const data = await res.data;
    setBookData(data);
    //console.log(data);  
  };

  useEffect(()=>{
    handleFetch();
  },[]);


      //handlerFunction
  async function onSwipeRight (bookObj: Book) {
  const match = await axios.post(`https://binderapp-server.herokuapp.com/api/trade_table/user/${getUsername()}`,
   bookObj  );
   console.log("MATCH ", match.data);
   console.log("swipe right: ", bookObj.title)
   if( match.data > 0){
    Alert.alert(`You got a new match!`)
    setMatchState(match.data);
   }
}
const onSwipeLeft =( bookObj: Book )=> {
       console.log('swipe left', bookObj.title)
     }


const {width: screenWidth} = useWindowDimensions();

const hiddenSreenWidth = 2 * screenWidth; 

const sharedValue = useSharedValue(0);
//console.log('shared value:', sharedValue);

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
        [1, 0.7, 1]
        ),
    },  
  ],
  opacity: interpolate(
    sharedValue.value,
    [-hiddenSreenWidth, 0, hiddenSreenWidth],
    [1, 0.6, 1]
  )
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
  onEnd: (event)=>{

    if(Math.abs(event.velocityX )< SWIPE_VELOCITY) {
      sharedValue.value =withSpring(0);
      console.log('🐱' ,sharedValue.value);
      return;
    }
    sharedValue.value = withSpring(
      hiddenSreenWidth * Math.sign(event.velocityX),
      {},
      () =>runOnJS(nextProfile)(nextIndex)
      );  
      
      
     const onSwipe = event.velocityX > 0 ?  onSwipeRight : onSwipeLeft; 
    onSwipe && runOnJS(onSwipe)(currentProfile);
  },
}
);

useEffect(() => {
  sharedValue.value = 0;
  setProfile(currentProfile)
  
  //console.log(currentProfile);
}, [currentProfile, sharedValue]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.pageContainer}>
        {nextProfile && ( 
      <View style={styles.nextCardContainer}>
        <Animated.View style={[styles.animatedCard, nextCardStyle]}>
           <BookCard bookData={nextProfile} index={nextIndex}/>
        </Animated.View>
        </View>
        )}
            {currentProfile && (
      <PanGestureHandler onGestureEvent={gestureHandler} >
          <Animated.View style={[styles.animatedCard, cardStyle]}>
              <BookCard bookData={currentProfile}  index={currentIndex}/> 
          </Animated.View> 
      </PanGestureHandler>
      )}   
      </View>    
    
    </GestureHandlerRootView>
  );
}



const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    //backgroundColor:'red'
  },
  animatedCard: {
    width: '90%',
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
