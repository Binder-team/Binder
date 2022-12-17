import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Image, TouchableOpacity, View, Text, Button, Linking } from 'react-native';
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
import ReputationModal from './ReputationModal';
import { openInbox } from 'react-native-email-link';
interface Props {
    item: {
        thumbnail1:string,
        title1: string,
        author1: string,
        condition1: string,
        username1: string,
        email1: string,
        thumbnail2:string,
        title2: string,
        author2: string,
        condition2: string,
        username2: string,
        email2: string
    },
    setCurrentView: Function,
    setRerender: Function,
    counter: number
}

const ConfirmExchange: React.FC<Props> = ({item, setCurrentView, setRerender, counter}) => {
    const [openModal, setOpenModal] = useState(false);
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [matchedBooks, setMatchedBooks] = useState<[]>([]);
    // const [rerender, setRerender] = useState<number>(0);
    useEffect(()=>{
        console.log(item)
    },[])

    const onClose = () => {
      setOpenModal(false);
    }


    //when 'confirm exchange' button is pressed

  const sendCancel = async () => {
      try {
      //sends a post request to cancel exchange
      const put = await axios.put(
          `https://binderapp-server.herokuapp.com/api/matches/deny/user/${getUsername()}`, item
      );
      const data = await put.data;
      counter++
      setRerender(counter)
      console.log("cancelled exchange")
      } catch (err) {
      console.log(err);
      }
  }
  const emailTitle = `Book x Change Match`

  const emailBodyUser2 = `Hello, \n\n\nThank you for accepting the book match! \n\n Below are the details of my book: 
    \n\n${item.title1}, \nby ${item.author1}, \nin ${item.condition1} condition \n\nand I am interested in your book:
    \n\n${item.title2}, \nby ${item.author2}, \nin ${item.condition2} condition\n\nPlease let me know you preferred method of exchanging. I look forward to hearing back from you!\n\nWith regards, \n\n${item.username1}`
    
  const emailBodyUser1 = `Hello, \n\n\nThank you for accepting the book match! \n\n Below are the details of my book: 
    \n\n${item.title2}, \nby ${item.author2}, \nin ${item.condition2} condition \n\nand I am interested in your book:
    \n\n${item.title1}, \nby ${item.author1}, \nin ${item.condition1} condition\n\nPlease let me know you preferred method of exchanging. I look forward to hearing back from you!\n\nWith regards, \n\n${item.username2}`
    
    return (
        <View style={styles.item}> 
        <View style={styles.backContainer}>
          <TouchableOpacity 
              style={styles.backButton}
                title = 'back'
                onPress={()=> 
                    setCurrentView("all matches")
                }
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
            
          <>
            {getUsername()!==item.username1?(
              <View style={styles.bookContainer}> 
                <Image
                style={styles.avatarContainer}
                source={{
                    uri: item.thumbnail1,
                    width: 50,
                    height: 50,
                }}
              />  
                <Text style = {styles.bookTitle}>Title: {item.title1}</Text>
                <Text>Author: {item.author1}</Text>
                <Text>Condition: {item.condition1}</Text>
                <Text>User: {item.username1}</Text>
                <Text>Contact:</Text> 
                <View style = {styles.emailContainer}>
                  <TouchableOpacity style={styles.emailButton}>
                    <Text 
                    style={styles.buttonText}
                    onPress={
                      () => Linking.openURL(`mailto:${item.email1}?subject=${emailTitle}&x&change&&body=${emailBodyUser1}`) }>
                      {item.email1}
                    </Text>
                </TouchableOpacity>
                </View>
                
            </View>  
            ):(
            <View style={styles.bookContainer}>
                <Image
                  style={styles.avatarContainer}
                  source={{
                      uri: item.thumbnail2,
                      width: 50,
                      height: 50,
                  }}
                />
                <Text style = {styles.bookTitle}>Title:{item.title2}</Text>
                <Text>Author:{item.author2}</Text>
                <Text>Condition:{item.condition2}</Text>
                <Text>User:{item.username2}</Text>
                <Text>Contact:</Text>
                <View style = {styles.emailContainer}>
                  <TouchableOpacity style={styles.emailButton}>
                  <Text 
                  style={styles.buttonText}
                  onPress={
                    () => Linking.openURL(`mailto:${item.email2}?subject=${emailTitle}&x&change&&body=${emailBodyUser2}`) }>
                    {item.email2}
                  </Text>
                </TouchableOpacity>
                </View>
                
                
            </View>
          )
            }
          </>  
            
            
            <View style = {styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text title="Confirm Exchange" 
                style={styles.buttonText}
                onPress={() => setOpenModal(true)}>Confirm your exchange</Text>
                  <ReputationModal 
                      item={item} 
                      text='Rate your exchange!' 
                      buttonText='Close' 
                      visible={openModal} 
                      onClose={onClose}
                      setRerender={setRerender}
                      counter={counter}
                  ></ReputationModal>
                </TouchableOpacity>
                <TouchableOpacity>
                    <TouchableOpacity

                      style={styles.denyButton}
                        title = 'cancel exchange'
                        onPress={()=>sendCancel(item)
                        }
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ConfirmExchange;

const styles = StyleSheet.create({
  button:{
    flex: 1,
    width: 100, 
    height: 20,
    backgroundColor:'#3C1874',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    marginHorizontal: 5,
    elevation:5,
    shadowColor: 'black',
  },  
  denyButton: {
    flex: 1,
    width: 100, 
    height: 40,
    backgroundColor:'#932432',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    marginHorizontal: 5,
    elevation:5,
    shadowColor: 'black',
  },
  backButton: {
    flex: 1,
    width: 100, 
    height: 20,
    backgroundColor:'#3C1874',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    marginHorizontal: 5,
    elevation:5,
    shadowColor: 'black',
  },
  backContainer:{
    display:'flex',
    justifyContent:'center',
    alignContent:'center',
    // backgroundColor:'blue',
    width:200,
    height:40
  },
  buttonText: {
    fontSize: 15,
    color: '#F3F3F3',
    lineHeight: 18,
    fontWeight: '400',
    
  },buttonContainer:{
    flexDirection: 'row',
    marginHorizontal:20,
    justifyContent: 'space-evenly',
    backgroundColor:'#F3F3F3',
  },
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    // backgroundColor:'green',
  },
  avatarContainer: {
    backgroundColor: 'D9D9D9',
    borderRadius: 10,
    height: 120,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookTitle:{
      fontWeight:'bold'
    },
  title: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emailContainer:{
    height: 50,
    width: '50%',


  },
  emailButton: {
    flex: 1,
    width: 100, 
    height: 5,
    backgroundColor:'#3C1874',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    marginHorizontal: 5,
    elevation:5,
    shadowColor: 'black',
  },
  separator: {
    
  },
  matchContainer:{
    width:'100%',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    backgroundColor:'red',
  }, 
  bookContainer: {
    //backgroundColor: 'D9D9D9',
    borderRadius: 5,
    height: 400,
    width: '100%',
    justifyContent: 'center',
    // flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
  },
  item: {
    width: '100%',
  // flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal:15,
    flexWrap: 'wrap',
    backgroundColor:'#F3F3F3',
    
    }, 
    text: {
      alignItems:'flex-start',
      justifyContent: 'center',
      fontSize: 14, 
      fontWeight: '500', 
      alignSelf: 'center'
    },
    // app: {
    // width: '100%',
    // height: '100%',
    // backgroundColor: 'blue',
    // flex: 1,
    // alignContent: 'center',
    // justifyContent: 'center',
    // },
  });