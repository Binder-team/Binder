import { useState } from "react";
import { Text, StyleSheet, View, Image, Alert } from "react-native";
import axios from 'axios';
import { getUsername } from "./userTokenManager";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Searchbar, Button, DefaultTheme, Portal, Dialog, Paragraph} from "react-native-paper";
import { Book } from "../types";
import DropDown from "react-native-paper-dropdown";
import { setRerender } from "./userTokenManager";

type BookData = {
    isbn: string;
    title: string;
    condition: string
};


const AddBooks = () => {
  const [bookResults, setBookResults] = useState([]);
  const [bookTitleQuery, setBookTitleQuery] = useState<string>('');
  const [condition, setCondition] = useState<string>('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [visible, setVisible] = useState(false);

  const conditionList = [
    {
      label: "Like New",
      value: "Like New",
    },
    {
      label: "Great",
      value: "Great",
    },
    {
      label: "Good",
      value: "Good",
    },
    {
      label: "Fine",
      value: "Fine",
    },
    {
      label: "Poor",
      value: "Poor",
    }
  ];
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  async function fetchBooks (): Promise<void> {
    if (condition === '') {
      showDialog();
    } else {
      const key = 'AIzaSyBN1ZgA46ECvqACR6mvRPOSSRbHmdtKCjI';
      const fetchedBooksResult = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookTitleQuery}&printType=books&orderBy=relevance&key=${key}`);
      const booksResult = fetchedBooksResult.data.items;
      const booksArray = booksResult.slice(0, 4);
      
      const books = await Promise.all(booksArray.map(async (book : Book) => {
        const fetchedBook = await axios.get(`https://www.googleapis.com/books/v1/volumes/${book.id}?key=${key}`);
        const bookData = fetchedBook.data.volumeInfo;
        const default_image = 'https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fleadershiftinsights.com%2Fwp-content%2Fuploads%2F2019%2F07%2Fno-book-cover-available.jpg';
        const imageBase64Fetch = await axios.post("https://binderapp-server.herokuapp.com/api/user_books/base", {
          "image_url": bookData.imageLinks ? (bookData.imageLinks.large ? bookData.imageLinks.large : (bookData.imageLinks.thumbnail ? bookData.imageLinks.thumbnail : default_image)) : default_image,
        });
        const imageBase64 = imageBase64Fetch.data;
        const bookObj = {
          book_id: fetchedBook.data.id,
          title: bookData.title,
          condition: condition,
          author: bookData.authors ? bookData.authors.join(', ') : 'n/a',
          image_url: imageBase64,
          thumbnail_url: imageBase64,
        }
        return bookObj;
      }));
      const bookCards = books.map((book: Book) => {
        return (
          <Card style={styles.book__card__container} mode="outlined">
            <View style={styles.book__card}>
              <View  style={styles.book__image__container}>
                <Image
                  style={styles.thumbnail}
                  source={{uri: book.image_url
                  }}
                  />
              </View>
              <Card style={styles.book__info__container}>
                <View style={styles.book__info}>
                    <Text style={styles.titleText}>{book.title}</Text>
                    <Text style={{fontSize: 15}}>{book.author}</Text>
                </View>
                <View style={styles.book__buttons__container}>
                  <Button 
                    style={styles.button}
                    mode="outlined"
                    onPress={() => onSubmit(book, condition)}>
                    <Text style={styles.button__text}>Add</Text>
                  </Button>
                </View>
              </Card>
            </View>
        </Card>
      )});
      setBookResults(bookCards);
    }
  }

  
  async function onSubmit (book : Book, condition: string): Promise<void> {
    if (condition === '') {
      showDialog();
    } else {
      try {
        await axios.post(`https://binderapp-server.herokuapp.com/api/user_books/user/${getUsername()}`, book);
        Alert.alert(book.title, ' has been added!');
        setRerender(Math.random());
      } catch (error) {
        console.log(error)
      }
    }
  }
  const setConditions = (value: string) => {
    setCondition(value);
    console.log(condition);
  }

  const onChangeSearch = (query: string) => setBookTitleQuery(query);
  
  return (
    <View style={styles.input__container}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>To continue, please set the condition of your book</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={styles.title__input__container}>
        <View style={styles.title__input} >
          <View style={{width: '60%', marginRight: 10}}>
            <Searchbar
              style={{height: 60, marginTop: 5,}}
              placeholder="Enter book title"
              onChangeText={onChangeSearch}
              value={bookTitleQuery}
              onIconPress={fetchBooks}
            />
          </View>
          <View style={{width: '30%'}}>
            <DropDown
              label={"Condition"}
              mode={"outlined"} 
              theme={DefaultTheme}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={condition}
              setValue={(_value:string) => setConditions(_value)}
              list={conditionList}
              dropDownStyle={{
                width:'80%',
                height: 50
            }}
            />
          </View>
        </View>
      </View >
      <View style={styles.book__results__container}>
        <ScrollView
          style={styles.book__results}
          >
          {bookResults}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input__container: {
    margin: 0,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor:'#F9F2ED',
  },
  title__input__container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '20%',
    backgroundColor: '#fcf6ed',
    elevation: 5, 
  },
  title__input: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  book__results__container: {
    width: '100%',
    height: '80%',
    margin: 10,
  },
   book__results: {
    flexDirection: 'column',
    width: '95%',
    height: '100%',
  },
  condition: {
    width: '50%',
  },
  book__card__container: {
    elevation:5,
    width: '98%',
    flexDirection: 'column',
    borderRadius: 10,
    margin: 5,
  },
  book__card: {
    elevation:5,
    flexDirection: 'row',
    width: '100%',
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  book__image__container: {
    height: 170,
    justifyContent: 'center',
    borderRadius: 10,
    width: '33%',
  },
  book__info__container: {
    flexDirection: 'column',
    width: '67%',
    marginRight: 10,
    height: 170,
  },
  book__info: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  book__buttons__container: {
    width: '100%',
    height: 70,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    elevation: 5,
  },
  button: {
    backgroundColor:'#1e86ac',
    shadowColor: '#000',
    width: '100%',
    height: 35,
  },
  button__text: {
    fontSize: 15,
    color: 'white',
    lineHeight: 18,
    fontWeight: '400',
    resizeMode: 'contained'
  },
  thumbnail: {
    borderRadius: 8,
    height: 170,
    width: 120,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "900",
  },
});

export default AddBooks;

        