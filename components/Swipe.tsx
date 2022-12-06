import React, {useState} from 'react';
import { StyleSheet, Button, Text, View, Image, StatusBar, Animated } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

//Fake data 
const profiles = [
  {
    name:"Count of Monte Christo",
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
    //===IMPORTANT===
    let index = 1;  //index should be declared outside of App to avoid duplicates.  
    //It's here for now and resets every time this loads
const Swipe= ({}) => {

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
        <Animated.View style={{backgroundColor:"", width:"75%", height:"75%", transform:[{translateX}]}}>
          
          <Button title="<"
          onPress={() => swipeLeftAnimation.start(()=>{
            index++;
            setProfile(profiles[index%3])
          })}
          ></Button>

          <Image source={profile.pic}></Image>
          <Text>{profile.name}</Text>
          <Text>Condition: {profile.condition}</Text>

          <Button title=">"
          onPress={() => swipeRightAnimation.start(()=>{
            index++;
            setProfile(profiles[index%3])
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
  }
});


export default Swipe;
