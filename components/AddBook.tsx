import React, { useState } from "react";
import { TouchableOpacity, Text, TextInput, StyleSheet, View, Button} from "react-native";
import axios from 'axios'
const AddBooks = () => {
  
    axios.post('https://binderapp-server.herokuapp.com/api/user_books', {
        isbn: 'isbn',
        condition:'int'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    return (
        <View>
          <Text>ISBN:.....</Text>
          <TextInput placeholder='enter ISBN'/>
          <Text>Book Title:</Text>
          <TextInput placeholder='enter book title'/>
          <Text>Condition</Text>
          <TextInput placeholder='enter a number from 1 - 10'/>
          <View>
            <TouchableOpacity>
            <Button title='SUBMIT'/>
          </TouchableOpacity>
          </View>
          
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

export default AddBooks;

        