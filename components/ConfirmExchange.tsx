import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Image, TouchableOpacity, View, Text, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookCard from '../components/BookCard';
import { Book } from '../types';
import { getUsername } from '../components/userTokenManager';
import EditScreenInfo from '../components/EditScreenInfo';
// import {} from '../components/Themed';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { Card, Button } from 'react-native-paper';
import MatchScreen from '../screens/MatchScreen';
import ReputationModal from './ReputationModal';
import { openInbox } from 'react-native-email-link';
import Icon from 'react-native-vector-icons/Entypo'
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
    \n\n${item.title2}, \nby ${item.author2}, \nin ${item.condition2} condition\n\nPlease let me know your preferred method of exchanging. I look forward to hearing back from you!\n\nWith regards, \n\n${item.username1}`
    
  const emailBodyUser1 = `Hello, \n\n\nThank you for accepting the book match! \n\n Below are the details of my book: 
    \n\n${item.title2}, \nby ${item.author2}, \nin ${item.condition2} condition \n\nand I am interested in your book:
    \n\n${item.title1}, \nby ${item.author1}, \nin ${item.condition1} condition\n\nPlease let me know your preferred method of exchanging. I look forward to hearing back from you!\n\nWith regards, \n\n${item.username2}`
    
    return (
      <View style={styles.item}> 
        <View style={styles.backContainer}>
          <Button
              style={styles.backButton}
                title = 'back'
                onPress={()=> 
                    setCurrentView("all matches")
                }
            >
              <Icon style={styles.icon} name="chevron-left" color="black"/>
              {/* <Text style={styles.backButtonText}>Back</Text> */}
              
            </Button>
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
                <Text style = {styles.bookTitle}>{item.title1}</Text>
                <Text style={styles.text}>By: {item.author1}</Text>
                <Text style={styles.text}>Condition: {item.condition1}</Text>
                <Text style={styles.text}>User: {item.username1}</Text>
                <Text style={styles.emailText}>Send an email:</Text> 
                <View style = {styles.emailContainer}>
                  <Button style={styles.emailButton}>
                    <Text 
                    style={styles.emailButtonText}
                    onPress={
                      () => Linking.openURL(`mailto:${item.email1}?subject=${emailTitle}&x&change&&body=${emailBodyUser1}`) }>
                      {item.email1}
                    </Text>
                </Button>
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
                <Text style = {styles.bookTitle}>{item.title2}</Text>
                <Text style={styles.text}>By: {item.author2}</Text>
                <Text style={styles.text}>Condition:{item.condition2}</Text>
                <Text style={styles.text}>User:{item.username2}</Text>
                <Text style={styles.emailText}>Send an email: </Text>
                <View style = {styles.emailContainer}>
                  <TouchableOpacity style={styles.emailButton}>
                  <Text 
                  style={styles.emailButtonText}
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
              <TouchableOpacity style={styles.confirmButton}>
                <Button title="Confirm Exchange" 
                
                onPress={() => setOpenModal(true)}>
                  <Text style={styles.buttonText}>Confirm exchange</Text>
                </Button>
              </TouchableOpacity>
              <ReputationModal 
                  item={item} 
                  text='Rate your exchange!' 
                  buttonText='Close' 
                  visible={openModal} 
                  onClose={onClose}
                  setRerender={setRerender}
                  counter={counter}
              ></ReputationModal>
              <TouchableOpacity>
                  <Button
                    style={styles.denyButton}
                      title = 'cancel exchange'
                      onPress={()=>sendCancel(item)
                      }
                  >
                      <Text style={styles.buttonText}>Cancel</Text>
                  </Button>
              </TouchableOpacity>
            </View>
        </View>
    );
}

export default ConfirmExchange;

const styles = StyleSheet.create({
  item: {
    width: '100%',
  flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal:15,
    flexWrap: 'wrap',
    backgroundColor:'#fcf6ed',
    elevation:5,
    borderRadius:10
    }, 
  button:{
    flex: 1,
    //width: 100, 
    //height: 40,
    backgroundColor:'#1e86ac',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    marginHorizontal: 5,
    elevation:5,
    shadowColor: 'black',
  },  
  confirmButton:{
    flex: 1,
    width: 100,
    //height: 45,
    backgroundColor:'#1e86ac',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    marginHorizontal: 5,
    elevation:5,
    shadowColor: 'black',
    paddingHorizontal:0
  },
  denyButton: {
    flex: 1,
    //width: 100,
    //height: 40,
    backgroundColor:'#db5153',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    marginHorizontal: 5,
    elevation:5,
    shadowColor: 'black',
  },
  backButton: {
    flex: 1,
    width: 50, 
    height: 15,
    backgroundColor:'#1e86ac',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    marginHorizontal: 5,
    elevation:5,
    shadowColor: 'black',
  },
  backContainer:{
    display:'flex',
    justifyContent:'flex-start',
    backgroundColor:'#fcf6ed',
    width:75,
    height:60,
    paddingBottom:20,
  },
  buttonText: {
    fontSize: 13,
    color: '#F3F3F3',
    lineHeight: 15,
    fontWeight: '500',
  },
  emailButtonText:{
    fontSize: 15,
    color: '#F3F3F3',
    lineHeight: 18,
    fontWeight: '500',
  },
  backButtonText: {
    fontSize: 13,
    color: '#F3F3F3',
    lineHeight: 15,
    fontWeight: '500',
  },
  icon:{
    fontSize: 17,
    color: '#F3F3F3',
    lineHeight: 16,
    fontWeight: '500',
  },
  buttonContainer:{
    flex: 1,
    alignContent:'center',
    height:50,
    width:300,
    flexDirection: 'row',
    marginHorizontal:20,
    justifyContent: 'center',
    backgroundColor:'#fcf6ed',
    paddingTop:5
  },
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    // backgroundColor:'green',
  },
  avatarContainer: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    height: 175,
    width: 130,
    objectFit: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20
  },
  bookTitle:{
      fontWeight:'500',
      width:'100%',
      color:'black',
      fontSize: 20,
      paddingBottom:10,
      marginLeft: 45,
    },
  title: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emailContainer:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:0,
    marginBottom: 20,
    height: 50,
    width: 300,
    backgroundColor:'#fcf6ed'
  },
  emailButton: {
    flex: 1,
    width: '100%', 
    height: 5,
    backgroundColor:'#1e86ac',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    marginHorizontal: 10,
    marginBottom:15,
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
    backgroundColor:'#fcf6ed',
    
  }, 
  bookContainer: {
    borderRadius: 5,
    height: 400,
    width: '100%',
    justifyContent: 'center',
    // flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fcf6ed'
  },
  
  text: {
    alignItems:'flex-start',
    //justifyContent: 'center',
    fontSize: 17, 
    fontWeight: '400', 
    alignSelf: 'flex-start',
    color:'#666260',
    marginLeft: 22,
    

  },
  emailText:{
    alignItems:'flex-start',
    justifyContent: 'center',
    fontSize: 17, 
    fontWeight: '500', 
    alignSelf: 'center',
    color:'black',
    paddingTop: 15,
    marginBottom: 10,
  }
    // app: {
    // width: '100%',
    // height: '100%',
    // backgroundColor: 'blue',
    // flex: 1,
    // alignContent: 'center',
    // justifyContent: 'center',
    // },
  });