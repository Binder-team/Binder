// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';


export default function MatchScreen() {
  const [matchedBooks, setMatchedBooks] = useState({});
  useEffect(() => {
    getMatches();
  },[]);





  async function getMatches () {
  }
  return (
    <SafeAreaView style={styles.root}>

      <Text style={styles.title}>all book matches appear here</Text>
      <Text style={{fontWeight:'bold', fontSize: 24}}>New Matches</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </SafeAreaView>
  );
}





const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
    //alignItems: 'center',
    //justifyContent: 'center',
    //backgroundColor:'green',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
