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
import { ScreenContainer } from 'react-native-screens';
import Icon from 'react-native-vector-icons/Feather'
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
  const [refresh, setRefresh] = useState<boolean>(true);
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
              <Text style={styles.text}>By: {item.author1}</Text>
              <Text style={styles.text}>Condition: {item.condition1}</Text>
              <Text style={styles.text}>Posted by: {item.username1}</Text>
              {/* <Text>accepted?: {`${item.didUser1Accept}`}</Text>
              <Text>exhanged?: {`${item.didUser1Exchange}`}</Text> */}
              {/* <Text>Contact:{item.email1}</Text>  */}
            </View>  
            {/* <Icon style={styles.icon} name="close" color="black"/> */}
            <View style={styles.bookContainer}>
              <Image
                style={styles.avatarContainer}
                source={{
                  uri: item.thumbnail2,
                }}
              />
              <Text style = {styles.bookTitle}>{item.title2}</Text>
              <Text style={styles.text}>By: {item.author2}</Text>
              <Text style={styles.text}>Condition: {item.condition2}</Text>
              <Text style={styles.text}>Posted by: {item.username2}</Text>
              {/* <Text>accepted?: {`${item.didUser2Accept}`}</Text>
              <Text>exhanged?: {`${item.didUser2Exchange}`}</Text> */}
              {/* <Text>Contact:{item.email2}</Text> */}
            </View>
            <View style = {styles.buttonContainer}>
                {(item.didUser1Accept && item.didUser2Accept) 
                ? (<Button
                      activeOpacity={.3}
                      style = {styles.button}
                      title="see contact details"
                      mode="contained"
                      onPress={()=>{
                        setCurrentView("confirm exchange view")
                        setItem(item)
                    }}
                  >
                    <Text style={styles.buttonText}>Contact</Text>
                  </Button>
                ) : (item.username1===getUsername() && item.didUser1Accept || item.username2===getUsername() && item.didUser2Accept
                ) ? (
                  <Button
                      activeOpacity={.3}
                      style={styles.button}
                      title="pending"
                      mode="contained"
                      style={styles.pendingButton}> 
                      <Text style={styles.buttonText}>Pending</Text>
                  </Button>
                ):( 

                  <Button
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
                  </Button>
                )}
                <Button
                  activeOpacity={0.6}
                  style={styles.denyButton}
                  title="deny"
                  onPress={()=>{
                    sendCancel(item)
                  }}
                  >
                    <Text style={styles.buttonText}>Deny</Text>
                  </Button>
            
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
 
  useEffect(()=>{
    getMatchedBooks();
  },[refresh]);

  const itemSeparator = () => {
    return <View style={styles.separator} />;
  };
  
  return (
    <SafeAreaView >    
      <View style={styles.pageContainer}>
        <View>
          {currentView === "all matches"? ( 
            <View style={styles.titleContainer}>
              <TouchableOpacity style={styles.refreshBox}>
                  <Button onPress={ () => setRefresh(!refresh) } style={styles.refresh } >
                    <Icon name="refresh-ccw" size={16} color="#23598B" style={{padding: 0, marginLeft: 0}}/>
                  </Button>
                </TouchableOpacity>
              <View >
              
                
              </View>
              
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
  icon: {
    margin: 0,
    padding: 0,
  },
  pageContainer:{
    backgroundColor: '#FBF0DF',
    width:'100%',
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: 5,
    paddingBottom: 10,
    // borderColor: 'black',
    // borderWidth:2
  },
   item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    flexWrap: 'wrap',
    backgroundColor:'#FBF0DF',
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: 30,
    paddingHorizontal: 0,
    elevation:5
    // borderColor: 'red',
    // borderWidth:2
  }, 
  bookContainer: {
    borderRadius: 20,
    height: '90%',
    width: 180,
    alignItems: 'center',
    backgroundColor:'#fcf6ed',
    resizeMode:'cover',
    elevation:5,
    marginHorizontal:5,
    marginBottom:10
    // borderColor: 'black',
    // borderWidth:2
  },
  avatarContainer: {
    backgroundColor: '#F9F2ED',
    borderRadius: 4,
    height: 170,
    width: 110,
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
    paddingVertical:15,
    height: 75
  },
  buttonContainer:{
    flexDirection: 'row',
    marginHorizontal:30,
    justifyContent: 'space-evenly',
    backgroundColor:'#FBF0DF',
    marginTop: 15,
  },
  button: {
    flex: 1,
    //width: 10, 
    //height: 35,
    backgroundColor:'#1e86ac',
    //justifyContent: 'center',
   // alignItems: 'center',
   // borderRadius:5,
    marginHorizontal: 5,
    elevation:5,
    shadowColor: '#000',
   // mode:'contained'
  }, 
  denyButton: {
    flex: 1,
    //width: 10, 
    //height: 35,
    backgroundColor:'#db5153',
    //justifyContent: 'center',
    //alignItems: 'center',
    //borderRadius:5,
    marginHorizontal: 5,
    elevation:5,
    shadowColor: '000',
  },
  pendingButton:{
    flex: 1,
    //width: 10, 
    //height: 35,
    backgroundColor:'#97bcb8',
    color:'white',
    //justifyContent: 'center',
   // alignItems: 'center',
   // borderRadius:5,
    marginHorizontal: 5,
    elevation:5,
    shadowColor: '#000',
    disabled: 'true'
   // mode:'contained'
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    lineHeight: 18,
    fontWeight: '400',
    resizeMode: 'contained'

  },
  title: {
    width:'100%',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    paddingHorizontal:100,
    color:'#283747',
    backgroundColor:'#FBF0DF',
    paddingBottom:10,
    left:-15
  },
  separator: {  
    color: 'black'
  },
  text: {
    alignItems:'flex-start',
    fontSize: 14, 
    fontWeight: '500', 
    alignSelf: 'flex-start',

    marginLeft: 18,
    marginBottom: 5,
    color: '#666260',
   },
  titleContainer:{
    width:'100%',
    flexDirection:'row',
    backgroundColor:'#FBF0DF'

   },
  refreshBox:{
    position: 'absolute',
    alignSelf:'center',
    width: "100%",
    top: -10,
    left: 158,
    zIndex: 10,
    //marginLeft: 20,

   },
   refresh: {
    width: 1,
   }
});