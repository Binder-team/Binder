import React, { useEffect, useState }from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Avatar, Button, Card, DataTable, Title, ToggleButton } from 'react-native-paper';
import { Book, Rating } from '../types';
import { getUsername} from '../components/userTokenManager';
import { RootStackScreenProps } from '../types';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { Text } from '../components/Themed';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const starImgFilled = 'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';
const starImgCorner = 'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true';

export type Props = {
  book: Book;
  BookItem: Function;
  MyBooks: Function;
  LikedBooks: Function;
  navigation: Function
}

const MyPageScreen = ({ navigation }: RootStackScreenProps<'Login'>) => {
  const [toggleView, setToggleView] = useState('MyBooks');
  const [defaultRating, setDefaultRating] = useState(5);
  const [maxRating, setMaxRating] = useState([1,2,3,4,5]);
  const [userBooks, setUserBooks] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [likedBooks, setLikedBooks] = useState([]);
  const [logout, setLogout] = useState<boolean>(false);
  const {signOut} = useAuth();
  const  getUserInfo = async() => {
    const fetchedUserInfo = await axios.post(`https://binderapp-server.herokuapp.com/api/users/info`, 
    {
      "username": getUsername()
    });
    const info = fetchedUserInfo.data;
    setUserInfo(info);
  }
  useEffect(()=>{
    getUserRating();
    getUserBooks();
    getUserInfo();
    getLikedBooks();
  },[]);

  const getUserRating = async () => {
    const fetchedRatings = await axios.get(`https://binderapp-server.herokuapp.com/api/reputation/user/average/${getUsername()}`);
    const scoreArray = fetchedRatings.data.map((rating: Rating) => rating.score);
    const score = Math.min(scoreArray.reduce((acc: number, curr: number) => acc + curr, 0) / scoreArray.length);
    setDefaultRating(score);
  }

  const getUserBooks = async () => {
    const fetchedBooks = await axios.get(`https://binderapp-server.herokuapp.com/api/user_books/user/${getUsername()}`);
    const books = fetchedBooks.data.map((book: Book) => {
      return (
        <Card style={styles.book__card}>
          <Image 
            style={styles.thumbnail}
            source={
              {
                uri: book.thumbnail_url, 
                width: 50,
                height: 50,
              }
            }
          ></Image>
          <Text style={styles.book__title}>{book.title}</Text>
        </Card>
      );
    });
    setUserBooks(books);
  };

  const getLikedBooks = async () => {
    const fetchLikes = await axios.get(
      `https://binderapp-server.herokuapp.com/api/trade_table/liked/${getUsername()}`,
      );
      const likedBookIds = fetchLikes.data.map((book: Book) => book.bookId);
      const likedBooks =  await Promise.all(likedBookIds.map(async (id : string) => {
        const bookObj = await axios.get(
          `https://binderapp-server.herokuapp.com/api/user_books/${id}`,
          );
          return bookObj.data;
      }));
    const books = likedBooks.map((book) => {
      return (
        <Card style={styles.book__card} mode='outlined'>
          <Image 
            style={styles.thumbnail}
            source={
              {
                uri: book.thumbnail_url, 
                width: 50,
                height: 50,
              }
            }
          ></Image>
          <Text style={styles.book__title}>{book.title}</Text>
        </Card>
      );
    });
    setLikedBooks(books);
  };

  return (
    <View style={styles.container}>
        <Card style={styles.profile__container} mode='outlined'>
          <View style={styles.profile__column1}>
            <Card.Content>
              <Image style={styles.image}source={{uri:userInfo.profile_url}} ></Image>
              <Title>{userInfo.username}</Title>
              <View style={styles.strRating}>
                {
                  maxRating.map((item, key) => {
                    return (
                      <Image
                          style={styles.starImg}
                          source={
                              item <= defaultRating
                                  ? {uri: starImgFilled}
                                  : {uri: starImgCorner}
                        }/>
                      );
                  })
                }
              </View>
                <Text> {defaultRating} / 5</Text>
            </Card.Content>

            <View style={styles.profile__column2}>
              <View style={styles.profile__column2__top}>
                <View style={{justifyContent:'center',alignItems: 'flex-start' , flexDirection: 'row'}}>
                  <Avatar.Icon size={24} icon="pin" backgroundColor = "#23598B"/>
                  <Text>  {userInfo.city}</Text>
                  <Text>  {userInfo.postal_code}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Avatar.Icon size={24} icon="email" backgroundColor = "#23598B"/>
                  <Text>  {userInfo.email}</Text>
                </View>
              </View>
              <View style={styles.profile__column2__bottom}>
                <Card.Actions>
                  <TouchableOpacity>
                    <Button icon="account-edit" color = "#23598B">Edit</Button>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Button 
                    color = "#23598B"
                    onPress={signOut}
                    icon="logout">Logout
                    </Button>
                  </TouchableOpacity>
                </Card.Actions>
              </View>
            </View> 
          </View>
        </Card>
        <SafeAreaView>

        </SafeAreaView>
        <ToggleButton.Row onValueChange={value => setToggleView(value)} value={toggleView}>
          <ToggleButton style={styles.toggleButton} icon="book" value="MyBooks" color="white" />
          <ToggleButton style={styles.toggleButton} icon="cards-playing-heart-multiple" value="LikedBooks" color="white"/>
        </ToggleButton.Row>
        <Card style={styles.books__container} mode='outlined'>
          {toggleView === "MyBooks"
          ? (
            <View style={styles.books__shelf__container}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>My Books</DataTable.Title>
                </DataTable.Header>
                <ScrollView contentContainerStyle={styles.book__shelf}>
                  {userBooks}
                </ScrollView>
              </DataTable>
            </View>
          ): (
            <View style={styles.books__shelf__container}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Liked Books</DataTable.Title>
                </DataTable.Header>
                <ScrollView contentContainerStyle={styles.book__shelf}>
                  {likedBooks}
                </ScrollView>
              </DataTable>
            </View>
          )}
        </Card>
    </View>
  )
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    backgroundColor:'#F9F2ED',
  },
  profile__container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '35%',
    padding: 7,
    backgroundColor:'#F9F2ED',
  },
  profile__column1: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
    width: '50%',
  },
  profile__column2: {
    flexDirection: 'column',
    width: '120%',
    height: '100%'
  },
  profile__column2__top: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    width: '100%',
    height: '60%',
  },
  profile__column2__bottom: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    width: '100%',
    height: '40%',
  },
  image:{
    width:100,
    height:100,
    borderWidth: 10,
    borderRadius:25,
  },
  starImg: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },
  strRating: {
    flexDirection: 'row',
  },
  books__container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '60%',
  },
  books__shelf__container: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    height: '100%',
    backgroundColor:'#F9F2ED',
  },
  book__shelf: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  book__card: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 230,
    width: 116,
    margin: 7,
    overflow: 'hidden',
  },
  book__title: {
    marginTop: 10,
    fontWeight: 'bold'
  },
  thumbnail: {
    marginTop: 5,
    borderRadius: 8,
    height: 170,
    width: 100,
  },
  toggleButton: {
    width: '49%',
    backgroundColor: '#1E86AC',
  },
});

export default  MyPageScreen;