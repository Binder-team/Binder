import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import axios from 'axios'
const MyBooks = () => {
  //axios get request
  
  
    return (
       <View>
            <Text>
                This is the Liked Books list
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