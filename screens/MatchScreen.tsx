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
                  width: 50,
                  height: 50,
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
                  width: 50,
                  height: 50,
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
              
                {item.didUser1Accept && item.didUser2Accept 
                ? (<TouchableOpacity 
                    activeOpacity={.3}
                    style = {styles.button}
                    title="see contact details"
                    onPress={()=>{
                      setCurrentView("confirm exchange view")
                      setItem(item)
                    }}
                  >
                    <Text style={styles.buttonText}>see contact details</Text>
                  </TouchableOpacity>
                ) : ( 
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
      counter ++;
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
    <SafeAreaView style={styles.root}>
      
      
        
      <View style= {styles.matchContainer}>
        <View>
          {currentView === "all matches"? ( 
            <View>
              <Text title = "matches" style = {styles.title}>Your matches:</Text>
                <ScrollView>{matchedBooks}</ScrollView>
            </View>
      
          ):(
            <View>
              <Text title = "confirm exchange" style = {styles.title}>Confirm your exchange</Text>
               <ConfirmExchange
                  item = {item}
                  setCurrentView = {setCurrentView}
            />
            </View>
             
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}





const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: 'D9D9D9',
    borderRadius: 10,
    height: 120,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 10, 
    height: 40,
    backgroundColor:'#932432',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    marginHorizontal: 5,
    elevation:5,
    shadowColor: 'black',
  },
  buttonText: {
    fontSize: 15,
    color: '#F3F3F3',
    lineHeight: 18,
    fontWeight: '400'
  },
  root: {
    backgroundColor: '#283747',
    width: '100%',
    height: '100%',
    flex: 1,
    padding: 0,
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal:10,
    color:'#283747'
  },
  separator: {
    
  },
  matchContainer:{
    backgroundColor: '#283747',
    width:'100%',
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: 5,
    paddingBottom: 10,
  }, 
  bookContainer: {
    borderRadius: 20,
    height: '90%',
    width: '50%',
    // justifyContent: 'center',
    // flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#F3F3F3',
    
  },
   item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    flexWrap: 'wrap',
    backgroundColor:'#F3F3F3',
    borderRadius: 15,
    marginTop: 16,
    marginBottom: 20,
    paddingBottom:50,
    paddingHorizontal:10
   }, 
   text: {
    alignItems:'flex-start',
    justifyContent: 'center',
    fontSize: 14, 
    fontWeight: '500', 
    alignSelf: 'center'
   }
   
});
