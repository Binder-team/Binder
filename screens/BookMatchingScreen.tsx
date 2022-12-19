import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Image, StatusBar, useWindowDimensions, Pressable, PanResponder } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
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
  event,
  withDelay
} from 'react-native-reanimated';
import { Book } from '../types';
import { getToken, setToken, resetToken, getUsername, setUsername, username, getPassword, setPassword } from '../components/userTokenManager';
import { Alert } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { setRerender } from '../components/userTokenManager';






const Like = require('../assets/images/LIKE.png');
const Nope = require('../assets/images/nope.png');

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
const [currentIndex, setCurrentIndex] = useState(0);
const [nextIndex, setNextIndex] = useState(currentIndex + 1);
const [currentCard, setCurrentCard] = useState(bookData[currentIndex]);
const [matchState, setMatchState] = useState();
const currentProfile = bookData[currentIndex];
const nextProfile = bookData[currentIndex+1];
const translateX = useSharedValue(0);
const[profile, setProfile] = useState(currentProfile);


const handleFetch = async() => {
    const res = await axios.get(`https://binderapp-server.herokuapp.com/api/user_books/swipe/${getUsername()}`);
    const data = await res.data;
    setBookData(data);
  };

  useEffect(()=>{
    handleFetch();
  },[]);


      //handlerFunction
  async function onSwipeRight (bookObj: Book) {
  const match = await axios.post(`https://binderapp-server.herokuapp.com/api/trade_table/user/${getUsername()}`,
  bookObj  );
  console.log("MATCH ", match.data);
  setRerender(Math.random());
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
  ],
  opacity: interpolate(
    sharedValue.value,
    [-hiddenSreenWidth, 0, hiddenSreenWidth],
    [1, 0.6, 1]
  )
}))


const likeStyle = useAnimatedStyle(()=>({
  opacity: interpolate(sharedValue.value, [0, hiddenSreenWidth/10], [0, 1])
}));

const nopeStyle = useAnimatedStyle(()=> ({
  opacity: interpolate(sharedValue.value, [0, -hiddenSreenWidth/10], [0, 1])
}));

const gestureHandler = useAnimatedGestureHandler ({
  onStart: (_, context: AnimatedGHContext) =>{
    context.startX = sharedValue.value;
  },
  onActive: (event, context: AnimatedGHContext) => {
    sharedValue.value = event.translationX;
    //console.log('Touch x: ', event.translationX);

  },
  onEnd: (event) => {

    if(Math.abs(event.velocityX )< SWIPE_VELOCITY) {
      sharedValue.value =withSpring(0);
      return;
    }
    sharedValue.value = withSpring(
      hiddenSreenWidth * Math.sign(event.velocityX),
      {},
      () =>runOnJS(setCurrentIndex)(currentIndex + 1), 
      );
      //function for matching ... should be on screen 
      
    const onSwipe = event.velocityX > 0 ?  onSwipeRight : onSwipeLeft; 

    onSwipe && runOnJS(onSwipe)(currentProfile);
    runOnJS(setNextIndex)(nextIndex + 1);
  },
});

  useEffect(() => {
  sharedValue.value = 0;
  }, [currentIndex, translateX]);
  

  
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.pageContainer}>
        {nextProfile && (
      <View style={styles.nextCardContainer}>
        <Animated.View style={[styles.animatedCard,nextCardStyle]}>
          <BookCard bookData={nextProfile} index={currentIndex+ 1}/>
        </Animated.View>
        </View>
        )}

        {currentProfile && (
      <PanGestureHandler onGestureEvent={gestureHandler} >
          <Animated.View style={[styles.animatedCard,cardStyle]}>
            <Animated.Image 
                source={Like}
                style={[styles.like, {left: 10}, likeStyle]}
                resizeMode="contain"
           />
           <Animated.Image
               source={Nope}
               style={[styles.like, {right: 10}, nopeStyle]}
               resizeMode="contain"
               />
              <BookCard bookData={currentProfile}  index={currentIndex}/> 
          </Animated.View> 
      </PanGestureHandler>
      )}
       <View style={styles.vectorContainer}>
        <Entypo name="cross" size={50} color="#FF4500" style={{padding: 10, marginRight: 100}} />
         <Entypo name="check" size={50} color="#32CD32"  style={{padding: 10, marginLeft: 100}}/>
       </View>
      </View>    
    </GestureHandlerRootView>
  );
}



const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor:'#F9F2ED',
  },
  animatedCard: {
    position:'absolute',
    width: '90%',
    height: '70%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 10,
    //backgroundColor:'blue',
  }, 
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  like: {
    width: 120,
    height: 120,
    position: 'absolute',
    top: 1,
    zIndex: 1,
    elevation: 20,
  },
  vectorContainer: {
    alignItems:'flex-end',
    flexDirection: 'row', 
    paddingTop: 670,
  }
  
});
export default Swipe;
