import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Image, StatusBar, Animated } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import axios from 'axios';

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

const Swipe = ({}) => {


  const translateX = new Animated.Value(0);
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
const [profile, setProfile] = useState(bookData[0]);

    // Animations
    const reset = Animated.timing(translateX,{
      toValue:0,
      duration:250,
      useNativeDriver:true
    })
  
    const swipeRightAnimation = Animated.timing(translateX,{
      toValue: 600,
      duration: 400,
      useNativeDriver:true
    })
  
    const swipeLeftAnimation = Animated.timing(translateX,{
      toValue: -600,
      duration: 400,
      useNativeDriver:true
    })

  const handleSwipe=(nativeEvent:any) => { // "nativeEvent" is like "e" but for gesture handler
    console.log(nativeEvent);
    //Currently leaving is as "Any"
    
    //swiping right
    if(nativeEvent.translationX < -225){  //0,0 is bottom left
      console.log("Swiped Right");
      //Here we would add the code to save the user profile + book into our match list.
      
      index++;
      swipeRightAnimation.start(()=>{
        //add profile to match list
        setProfile(bookData[index])
      })
    }
    //swiping left
    else if(nativeEvent.translationX > 225){
      console.log("Swiped Left");

      index++;
      swipeLeftAnimation.start(()=>{
        setProfile(bookData[index])
      })
    };
  };

  const handlePan= Animated.event(
    [{nativeEvent:{translationX:translateX}}],{useNativeDriver:true}
  )  
  
  const handleFetch = async() => {
    const res = await axios.get('https://binderapp-server.herokuapp.com/api/user_books');
    const data = await res.data;
    setBookData(data);

    console.log(data);
    
  };

  useEffect(()=>{
    handleFetch();
  },[]);

  const [bookPosition, setBookPosition] = useState(bookData[0]);

  return (
    <View style={styles.container}>
      <PanGestureHandler onHandlerStateChange={handleSwipe} onGestureEvent={handlePan} >
        <Animated.View style={{backgroundColor:"yellow", width:"100%", height:"100%", transform:[{translateX}]}}>

          <Image 
          style={{width: 100, height: 100}}
          // source={{uri: bookData[index]["thumbnail_url"]}}
          source={{uri: `${bookData[index]["thumbnail_url"]}` }}
          />

          

          <Text>{bookData[index]["title"]}</Text>
          <Text>Condition: {bookData[index]["condition"]}</Text>

          <Button style={styles.Button} title="<"
          onPress={() => swipeLeftAnimation.start(()=>{
            index++;
            setProfile(profiles[index])
          })}
          ></Button>
          <Button title=">"
          onPress={() => swipeRightAnimation.start(()=>{
            index++;
            setProfile(profiles[index])
          })}
          ></Button>

        </Animated.View>
      </PanGestureHandler>
      <StatusBar />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer:{
    flex:1,
    width:"100%",
    alignItems: 'center',
    justifyContent: 'center'
  },
  card:{
    backgroundColor: "rgb(230,230,230)",
    width:"100%",
    height:"100%",
    borderRadius: 5,
    position:'absolute',
    borderWidth:1.5,
    borderColor:'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Button:{
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});


export default Swipe;
