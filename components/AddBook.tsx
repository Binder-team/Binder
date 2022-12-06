import React, { useState } from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";
import axios from 'axios'
const AddBooks = () => {
  
  
    return (
        <View>
          <Text>ISBN:</Text>
          <TextInput placeholder='enter ISBN'/>
          <Text>Book Title:</Text>
          <TextInput placeholder='enter book title'/>
          <Text>Condition</Text>
          <TextInput placeholder='enter a number from 1 - 10'/>
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

        