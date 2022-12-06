import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Animated } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

//Fake data 
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
    //===IMPORTANT===
    let index = 1;  //index should be declared outside of App to avoid duplicates.  
    //It's here for now and resets every time this loads
export default function Swipe(props: any) {

  const [profile,setProfile] = useState(profiles[0]);
  const translateX = new Animated.Value(0);

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

  const handleSwipe=(nativeEvent:any) =>{ // "nativeEvent" is like "e" but for gesture handler
    console.log(nativeEvent);
    //Currently leaving is as "Any"
    
    //swiping right
    if(nativeEvent.translationX < -225){  //0,0 is bottom left
      console.log("Swiped Right");
      //Here we would add the code to save the user profile + book into our match list.
      
      index++;
      swipeRightAnimation.start(()=>{
        //add profile to match list
        setProfile(profiles[index%3])
      })
    }
    //swiping left
    else if(nativeEvent.translationX > 225){
      console.log("Swiped Left");

      index++;
      swipeLeftAnimation.start(()=>{
        setProfile(profiles[index%3])
      })
    };
  };

  const handlePan= Animated.event(
    [{nativeEvent:{translationX:translateX}}],{useNativeDriver:true}
  )  


  return (
    <View style={styles.container}>
      <PanGestureHandler onHandlerStateChange={handleSwipe} onGestureEvent={handlePan} >
        <Animated.View style={{backgroundColor:"yellow", width:"75%", height:"75%"}}>
          <Image ></Image>
          <Text>{profile.name}</Text>
          <Text>Age: {profile.age}</Text>
          <Text>Likes: {profile.likes.join(', ')}</Text>
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
  }
});