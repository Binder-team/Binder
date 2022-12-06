import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";

const LikedBooks = () => {
  
  
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

export default LikedBooks;