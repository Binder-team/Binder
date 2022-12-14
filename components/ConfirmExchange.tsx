import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Image, TouchableOpacity, View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookCard from '../components/BookCard';
import { Book } from '../types';
import { getUsername } from '../components/userTokenManager';

import EditScreenInfo from '../components/EditScreenInfo';
// import {} from '../components/Themed';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { Card } from 'react-native-paper';
import MatchScreen from '../screens/MatchScreen';
const ConfirmExchange = ({matchItem, setCurrentView}) => {
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [matchedBooks, setMatchedBooks] = useState([]);
    
const item = matchItem;

    return (
        <View style={styles.item}> 
        
            <TouchableOpacity>
                <Button 
                    title = 'back'
                    onPress={()=> 
                        setCurrentView("all matches")
                    }
                >back to matches</Button>
            </TouchableOpacity>
            <View style={styles.bookContainer}> 
               
                <Image
                style={{
                    borderColor: 'black',
                    borderWidth: 2,
                    height: 100,
                    width: 100,
                }}
                source={{
                    uri: item.thumbnail1,
                    width: 50,
                    height: 50,
                }}
            />
                <Text>Title:{item.title1}</Text>
                <Text>Author:{item.author1}</Text>
                <Text>Condition:{item.condition1}</Text>
                <Text>User:{item.username1}</Text>
                <Text>Contact:{item.email1}</Text> 
            </View>  
            <View style={styles.bookContainer}>
                <Image
                style={{
                    borderColor: 'black',
                    borderWidth: 2,
                    height: 100,
                    width: 100,
                }}
                source={{
                    uri: item.thumbnail2,
                    width: 50,
                    height: 50,
                }}
                />
                <Text>Title:{item.title2}</Text>
                <Text>Author:{item.author2}</Text>
                <Text>Condition:{item.condition2}</Text>
                <Text>User:{item.username2}</Text>
                <Text>Contact:{item.email2}</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <Button title = 'confirm exchange' 
                        onpress={()=>{
                            setConfirmed(true)
                        }}>Confirm exchange</Button>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Button title = 'cancel trade'>Cancel exchange</Button>
                </TouchableOpacity>
            </View>
        </View>
    );


}

export default ConfirmExchange;

const styles = StyleSheet.create({
    buttonContainer:{
      flexDirection: 'row'
    },
    root: {
      width: '100%',
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      backgroundColor:'green',
    },
    title: {
      alignSelf: 'flex-start',
      justifyContent: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      
    },
    matchContainer:{
      width:'100%',
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      textAlign: 'center',
      //backgroundColor:'red',
    }, 
    bookContainer: {
      //backgroundColor: 'D9D9D9',
      borderRadius: 20,
      height: 300,
      width: '50%',
      justifyContent: 'center',
      // flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff5cf',
  
    },
     item: {
      width: '100%',
    //   flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 13,
      flexWrap: 'wrap',
      //backgroundColor:'blue',
     }, 
     text: {
      alignItems:'flex-start',
      justifyContent: 'center',
      fontSize: 20, 
      fontWeight: 'bold', 
      alignSelf: 'center'
     }
     
  });