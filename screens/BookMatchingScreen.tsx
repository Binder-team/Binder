import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, useWindowDimensions, Pressable, PanResponder } from 'react-native';
import { Portal, Dialog, Paragraph, Button } from 'react-native-paper';
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
import { getUsername } from '../components/userTokenManager';
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
const [showDropDown, setShowDropDown] = useState(false);
const [visible, setVisible] = useState(false);


const handleFetch = async() => {
    const res = await axios.get(`https://binderapp-server.herokuapp.com/api/user_books/swipe/${getUsername()}`);
    const data = await res.data;
    setBookData(data);
  };

  useEffect(()=>{
    handleFetch();
    console.log("fetching");
  },[]);


  async function onSwipeRight (bookObj: Book) {
  const match = await axios.post(`https://binderapp-server.herokuapp.com/api/trade_table/user/${getUsername()}`,
  bookObj  );
  console.log("MATCH ", match.data);
  setRerender(Math.random());
  console.log("swipe right: ", bookObj.title)
  if( match.data > 0){
    showDialog();
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
    runOnJS(setNextIndex)(currentIndex + 1);
  },
});

  useEffect(() => {
  sharedValue.value = 0;
  }, [currentIndex, translateX]);
  
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>You Got A Match!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>You've got 1 match.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
       {/* <View style={styles.vectorContainer}>
        <Entypo name="cross" size={40} color="#FF4500" style={{padding: 0, marginRight: 100}} />
        <Entypo name="check" size={40} color="#32CD32"  style={{padding: 0, marginLeft: 100}}/>
       </View> */}
      </View>    
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    marginTop: 1,
    backgroundColor:'#FBF0DF'
  },
  animatedCard: { //The actual card location
    position:'absolute',
    width: '90%',
    height: '75%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    //backgroundColor:'blue',
  }, 
  text: {

  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
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
    paddingTop: 580
  }
  
});
export default Swipe;
