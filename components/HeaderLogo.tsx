import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";



export type HeaderProps ={
    title: string,
}


export default function Header ({title}: HeaderProps) {
    
    return (
    <View style={styles.container}>
      <Text>Book X Change</Text>

    </View>
)}


const styles = StyleSheet.create({
    container:{},
})