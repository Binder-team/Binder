import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import axios from 'axios'
const MyBooks = () => {
  
  
<<<<<<< HEAD
  //axios get all books from user using 'https://binderapp-server.herokuapp.com/api/user_books'
  //it's going to be stored in the state, data, then 
  //in the return statement, map through array to render

  const handleFetch = async() => {
    const res = await axios.get(`https://binderapp-server.herokuapp.com/api/user_books`);
    const data = await res.data;
    setData(data);
    console.log(data);
  }

  useEffect(()=>{
    handleFetch();
},[])
//map over data
const showBooks = data.map((obj) => {
    return (
        
        <View key={obj["id"]}>
            <View>
                <Image source={{uri:obj["thumbnail_url"],width: 50, height: 50,}}/>
            </View>

            <Text>Title:{obj["title"]}</Text>
            <Text>Author:{obj["author"]}</Text>
            <Text>Condition:{obj["condition"]}</Text>
            <Text></Text>
        </View>
    )
})
=======
>>>>>>> de933b945749d88ef744964be0101304c687f4de
    return (
       <View>
        <Text>
            This is the My Books list
        </Text>

       </View> 
 
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default MyBooks;