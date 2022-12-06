import React, { useState }from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from 'react-native';
// import { RootTabScreenProps } from '../types';
import  LikedBooks from '../components/LikedBooks'
import MyBooks from '../components/MyBooks';
import BookItem from '../components/BookItem';
import { Book } from '../types';

export type Props = {
  book: Book;
  BookItem: Function;
  MyBooks: Function;
  LikedBooks: Function;
}
 const MyPageScreen: React.FC <Props> = ({book, BookItem}) =>  {
  //  const likedBooks = LikedBooks();
  //  const myBooks = MyBooks();
  const [currentView, setCurrentView] = useState ("myBooks");


<<<<<<< HEAD
//const Stack = createNativeStackNavigator();


 const MyPageScreen =() =>  {
   const likedBooks = LikedBooks();
   const myBooks = MyBooks();
   
  
  const [currentView, setCurrentView] = useState("myBooks");
=======
>>>>>>> e1055d0611a58a033e390f6389f6cfcf011c9ae0
 

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: 'white', height: '100%'}}>
      <Text style={styles.title}> My Profile</Text>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.button}>
          <TouchableOpacity  onPress={() => setCurrentView("myBooks")}>
          <Text>My Books</Text>       
          </TouchableOpacity>         
        </View>      
        <View  style={styles.button}>
          <TouchableOpacity  onPress={() =>setCurrentView("likedBooks")} >
            <Text>Liked Books</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {currentView === "myBooks"? (
          <MyBooks/>
        ): (<LikedBooks/>)}
      </View>
      <EditScreenInfo path="/screens/AddBooksScreen.tsx" />
    </View>
    </View>
  )
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
  button: {
    flex: 1,
    width: '100%', 
    height: 40,
    backgroundColor: '#008B8B',
    padding: 10,
    alignItems: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default  MyPageScreen;