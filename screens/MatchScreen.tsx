// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from 'react';
import { Platform, StyleSheet,Image, TouchableOpacity, } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookCard from '../components/BookCard';
import { Book } from '../types';
import { getUsername } from '../components/userTokenManager';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { Card } from 'react-native-paper';
import ConfirmExchange from '../components/ConfirmExchange';
import { RootStackParamList } from '../types';

export type Props = {
  book: Book,
  BookItem: Function,
  ConfirmExchange: Function
}

export default function MatchScreen({ navigation }) {
  const [acceptTrade, setAcceptTrade] = useState<boolean>(false);
  const [matchedBooks, setMatchedBooks] = useState<[]>([]); 
  const [currentView, setCurrentView] = useState<string>("all matches");
  const [numberMatches, setNumberMatches] = useState<number>();
  const [rerender, setRerender] = useState<number>();
  let counter = 0;

  const [item, setItem] = useState({
    thumbnail1:'',
    title1: '',
    author1: '',
    condition1: '',
    username1: '',
    email1: '',
    thumbnail2:'',
    title2: '',
    author2: '',
    condition2: '',
    username2: '',
    email2: ''
})
  const getMatchedBooks = async () => {
    try {
      const fetchMatch = await axios.get(
          `https://binderapp-server.herokuapp.com/api/matches/${getUsername()}`,
          );
          const matches = await fetchMatch.data;
          const mappedMatches = matches.map(item => {
          return (
          <View style={styles.item}>
            <View style={styles.bookContainer}> 
              <Image
                style={styles.avatarContainer}
                source={{
                  uri: item.thumbnail1,
                }}
              />
              <Text style = {styles.bookTitle}>{item.title1}</Text>
              <Text style={styles.text}>Author: {item.author1}</Text>
              <Text style={styles.text}>Condition: {item.condition1}</Text>
              <Text style={styles.text}>User: {item.username1}</Text>
              {/* <Text>accepted?: {`${item.didUser1Accept}`}</Text>
              <Text>exhanged?: {`${item.didUser1Exchange}`}</Text> */}
              {/* <Text>Contact:{item.email1}</Text>  */}
            </View>  
            <View style={styles.bookContainer}>
              <Image
                style={styles.avatarContainer}
                source={{
                  uri: item.thumbnail2,
                }}
              />
              <Text style = {styles.bookTitle}>{item.title2}</Text>
              <Text style={styles.text}>Author: {item.author2}</Text>
              <Text style={styles.text}>Condition: {item.condition2}</Text>
              <Text style={styles.text}>User: {item.username2}</Text>
              {/* <Text>accepted?: {`${item.didUser2Accept}`}</Text>
              <Text>exhanged?: {`${item.didUser2Exchange}`}</Text> */}
              {/* <Text>Contact:{item.email2}</Text> */}
            </View>
            <View style = {styles.buttonContainer}>
                {(item.didUser1Accept && item.didUser2Accept) 
                ? (<TouchableOpacity 
                    activeOpacity={.3}
                    style = {styles.button}
                    title="see contact details"
                    onPress={()=>{
                      setCurrentView("confirm exchange view")
                      setItem(item)
                    }}
                  >
                    <Text style={styles.buttonText}>See contact details</Text>
                  </TouchableOpacity>
                ) : (item.username1===getUsername() && item.didUser1Accept || item.username2===getUsername() && item.didUser2Accept
                ) ? (
                  <TouchableOpacity 
                        activeOpacity={.3}
                        style={styles.button}
                        title="pending"> 
                      <Text style={styles.buttonText}>Pending</Text>
                  </TouchableOpacity>
                ):( 

                  <TouchableOpacity 
                    activeOpacity={.3}
                    style={styles.button}
                    title="accept"
                    onPress={()=>{       
                      setAcceptTrade(true)
                      sendAccept(item)
                      }
                    }
                  > 
                  <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.denyButton}
                  title="deny"
                  onPress={()=>{
                    sendCancel(item)
                  }}
                  >
                    <Text style={styles.buttonText}>Deny</Text>
                  </TouchableOpacity>
            
              </View> 
          </View>
           )
          });
          console.log(Array.isArray(mappedMatches))
            setMatchedBooks(mappedMatches)
        } catch (err)  {
        console.log(err);  
      } 
  }
 

  const sendAccept = async (item) => {
    try {
      const put = await axios.put(
        `https://binderapp-server.herokuapp.com/api/matches/accept/user/${getUsername()}`, item
      );
      console.log(item);
      const data = put.data;
      setAcceptTrade(true);
      counter++;
      setRerender(counter);

    } catch (err) {
      console.log(err);
    }
  }  
  
  const sendCancel = async (item) => {
    try {
      
      const put = await axios.put(
        `https://binderapp-server.herokuapp.com/api/matches/deny/user/${getUsername()}`, item
      );
      const data = put.data;
      counter++;
      setRerender(counter);
      setNumberMatches(data);
        
      // setRerender(data);
    } catch (err) {
      console.log(err);
    }
  }
  
  
  useEffect(() => {
    getMatchedBooks();
  },[rerender]); 

  useEffect(() => {
    getMatchedBooks();
  },[]); 
 


  const itemSeparator = () => {
    return <View style={styles.separator} />;
  };
  
  return (
    <SafeAreaView >    
      <View style= {styles.pageContainer}>
        <View>
          {currentView === "all matches"? ( 
            <View>
              <Text title = "matches" style = {styles.title}>My matches:</Text>
                <ScrollView>{matchedBooks}</ScrollView>
            </View>
      
          ):(
            <View>
              <Text title = "confirm exchange" style = {styles.title}>Confirm your exchange</Text>
               <ConfirmExchange
                  item = {item}
                  setCurrentView = {setCurrentView}
                  setRerender={setRerender}
                  counter={counter}
            />
            </View>
             
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}





const styles = StyleSheet.create({
  pageContainer:{
    backgroundColor: '#F9F2ED',
    width:'100%',
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: 5,
    paddingBottom: 10,
  },
   item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    flexWrap: 'wrap',
    backgroundColor:'#F9F2ED',
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: 30,
    paddingHorizontal: 20
  }, 
   bookContainer: {
    borderRadius: 20,
    height: '90%',
    width: '50%',
    alignItems: 'center',
    backgroundColor:'#F9F2ED',
    resizeMode:'cover',
    borderColor: 'black',
  },
  avatarContainer: {
    backgroundColor: '#F9F2ED',
    borderRadius: 2,
    height: 170,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    marginTop: 5,
    
  },
  bookTitle:{
    fontSize:16,
    justifyContent:'center',
    textAlign:'center',
    fontWeight:'bold',
    paddingVertical:10,
    height: 75
  },
  buttonContainer:{
    flexDirection: 'row',
    marginHorizontal:20,
    justifyContent: 'space-evenly',
    backgroundColor:'#F3F3F3',
  },
  button: {
    flex: 1,
    width: 10, 
    height: 40,
    backgroundColor:'#3AB0FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    marginHorizontal: 5,
    elevation:5,
    shadowColor: '#000',
  }, 
  denyButton: {
    flex: 1,
    width: 10, 
    height: 40,
    backgroundColor:'#F87474',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    marginHorizontal: 5,
    elevation:5,
    shadowColor: 'black',
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    lineHeight: 18,
    fontWeight: '400'
  },
  title: {
    width:'100%',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    paddingHorizontal:10,
    color:'#DC5F00',
    backgroundColor:'#F9F2ED',
    paddingBottom:10
  },
  separator: {  
  },
   text: {
    alignItems:'flex-start',
    fontSize: 14, 
    fontWeight: '350', 
    alignSelf: 'flex-start',
    marginLeft: 30,

   }
   
});
