import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Dimensions } from 'react-native';
import { BubblingEventHandler } from 'react-native/Libraries/Types/CodegenTypes';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export type ButtonProps ={
    title: String;
    onPress: () => void,
    
  
}

export default function ButtonForm({ title, onPress, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity 
        style={styles.buttonContainer}
        onPress={onPress} 
        {...rest}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: windowWidth / 2,
    height: windowHeight / 15,
    backgroundColor:'#3C1874',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 5,
  },
  buttonText: {
    fontSize: 17,
    color: '#ffffff',
    lineHeight: 26
  }
});