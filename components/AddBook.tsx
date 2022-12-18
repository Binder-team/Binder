import { useState } from "react";
import { TouchableOpacity, Text, TextInput, StyleSheet, View, Button, Image, Alert} from "react-native";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { getUsername } from "./userTokenManager";
import SelectDropdown from "react-native-select-dropdown";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Searchbar } from "react-native-paper";
import { Book } from "../types";
type BookData = {
    isbn: string;
    title: string;
    condition: string
};


const AddBooks = () => {
  const [bookResults, setBookResults] = useState([]);
  const [bookTitleQuery, setBookTitleQuery] = useState<string>('');
  const [condition, setCondition] = useState('');
  const conditions = ["Like new", "Great", "Very good", "Fine", "Poor"];
  const [searchQuery, setSearchQuery] = useState('');
  
  const { control, handleSubmit, formState: { errors } } = useForm<BookData>({
    defaultValues: {
          isbn: '',
          title: '',
          condition: ''
        }
      });
    async function fetchBooks (): Promise<void> {
      const key = 'AIzaSyBN1ZgA46ECvqACR6mvRPOSSRbHmdtKCjI';
      const fetchedBooksResult = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookTitleQuery}&printType=books&orderBy=relevance&key=${key}`);
      const booksResult = fetchedBooksResult.data.items;
      const booksArray = booksResult.slice(0, 2);
      
      const books = await Promise.all(booksArray.map(async (book : Book) => {
        const fetchedBook = await axios.get(`https://www.googleapis.com/books/v1/volumes/${book.id}?key=${key}`);
        const bookData = fetchedBook.data.volumeInfo;
        const default_image = 'https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fleadershiftinsights.com%2Fwp-content%2Fuploads%2F2019%2F07%2Fno-book-cover-available.jpg';
        const bookObj = {
          book_id: fetchedBook.data.id,
          title: bookData.title,
          isAvailable: true,
          condition: condition,
          author: bookData.authors ? bookData.authors.join(', ') : 'n/a',
          image_url: bookData.imageLinks ? (bookData.imageLinks.large ? bookData.imageLinks.large : default_image) : default_image,
          thumbnail_url: bookData.imageLinks ? (bookData.imageLinks.thumbnail ? bookData.imageLinks.thumbnail : default_image) : default_image,
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
                  source={{uri: book.thumbnail_url}}
                  />
              </View>
              <View style={styles.book__info__container}>
                <View style={styles.book__info}>
                    <Text style={styles.titleText}>{book.title}</Text>
                    <Text>{book.author}</Text>
                </View>
                <View style={styles.add__button__container}>
                  <Button 
                    style={styles.add__button}
                    title="+"
                    onPress={(e) => {
                      e.preventDefault();
                      onSubmit(book);
                  }}></Button>
                </View>
              </View>
            </View>
        </Card>
      )});
      setBookResults(bookCards);
    }

    
    async function onSubmit (book : Book): Promise<void> {
      try {
        await axios.post(`https://binderapp-server.herokuapp.com/api/user_books/user/${getUsername()}`, book);
        Alert.alert(book.title, ' has been added!');
      } catch (error) {
        console.log(error + ':fire:')
      }
    }

    const onChangeSearch = (query: string) => setBookTitleQuery(query);
    
    return (
      <View style={styles.input__container}>
        <View style={styles.title__input__container}>
          <View style={styles.title__input} >
            <Searchbar
              placeholder="Enter book title"
              onChangeText={onChangeSearch}
              value={bookTitleQuery}
              onIconPress={fetchBooks}
            />
          </View>
        </View >
        <View style={styles.book__results__container}>
          {bookResults}
          <ScrollView
            style={styles.book__results}
          >
          </ScrollView>

        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  input__container: {
    border: 0,
    margin: 0,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  title__input__container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '15%',
    backgroundColor: '#479cff',
  },
  title__input: {
    height: 50,
    width: '60%',
  },
  book__results__container: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
   book__results: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  condition: {
    width: '50%',
  },
  book__card__container: {
    width: '98%',
    flexDirection: 'column',
    borderRadius: 10,
    margin: 5,
  },
  book__card: {
    flexDirection: 'row',
    width: '100%',
    height: 230,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  book__image__container: {
    justifyContent: 'center',
    width: '35%',
  },
  book__info__container: {
    flexDirection: 'column',
    width: '65%',
    height: 200,
  },
  book__info: {
    width: '100%',
    height: 130,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  book__buttons__container: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    borderRadius: 8,
    height: 200,
    width: 120,
  },
  baseText: {
    fontFamily: "Cochin",
  },
  titleText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  add__button__container: {
    marginTop: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  add__button: {
    borderRadius: 100,
    height: 10,
    width: 10,
  },
});

export default AddBooks;

        