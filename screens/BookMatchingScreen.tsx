import { StyleSheet } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Swipe from '../components/Swipe';
import { RootTabScreenProps } from '../types';
//import BookCard from '../components/BookCard';
//import { Book } from '../types';


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


//this is the main page where user swipes on a book or not. for now, just two buttons
export default function BookMatchingScreen({ navigation }: RootTabScreenProps<'FindBookTab'>) {
  return (

    <View style={styles.container}>
      {/* <Text style={styles.title}>Find a book</Text> */}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {<Swipe  /> }
      

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
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
});
