import { useState } from "react";
import { TouchableOpacity, Text, TextInput, StyleSheet, View, Button, Image, Alert} from "react-native";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { getUsername } from "./userTokenManager";
import SelectDropdown from "react-native-select-dropdown";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
type BookData = {
    isbn: string;
    title: string;
    condition: string
};


const AddBooks = () => {
  const [bookResults, setBookResults] = useState<[]>([]);
  const [bookTitle, setBookTitle] = useState('');
  const [condition, setCondition] = useState('');
  const conditions = ["Like new", "Great", "Very good", "Fine", "Poor"];
  
  const { control, handleSubmit, formState: { errors } } = useForm<BookData>({
    defaultValues: {
          isbn: '',
          title: '',
          condition: ''
        }
      });
    async function fetchBooks (): Promise<void> {
      const key = 'AIzaSyAS32GEr_NB25nXnjTjbEBabB8xatzPznE';
      const fetchedBooksResult = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&printType=books&orderBy=relevance&key=${key}`);
      const booksResult = fetchedBooksResult.data.items;
      const booksArray = booksResult.slice(0, 2);
      
      const books = await Promise.all(booksArray.map(async (book) => {
        const fetchedBook = await axios.get(`https://www.googleapis.com/books/v1/volumes/${book.id}?key=${key}`);
        const bookData = fetchedBook.data.volumeInfo;
        const default_image = 'https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fleadershiftinsights.com%2Fwp-content%2Fuploads%2F2019%2F07%2Fno-book-cover-available.jpg';
        const id = fetchedBook.data.id;
        const title = bookData.title;
        const author = bookData.authors ? bookData.authors.join(', ') : 'n/a';
        const image = bookData.imageLinks ? (bookData.imageLinks.large ? bookData.imageLinks.large : default_image) : default_image;
        const thumbnail = bookData.imageLinks ? (bookData.imageLinks.thumbnail ? bookData.imageLinks.thumbnail : default_image) : default_image;
        const bookObj = {
          book_id: id,
          title: title,
          is_available: true,
          condition: condition,
          author: author,
          image_url: image,
          thumbnail_url: thumbnail,
        }
        return bookObj;
      }));
      setBookResults(books);
    }
    
    async function onSubmit (book): Promise<void> {
      try {
          await axios.post(`https://binderapp-server.herokuapp.com/api/user_books/user/${getUsername()}`, book);
          Alert.alert(book.title, ' has been added!');
      } catch (error) {
        console.log(error + ':fire:')
      }
    }

    const renderBook = ({item}) => (
      <View style={styles.book__card__container}>
        <View 
          style={styles.book__card}
          >
          <Image
            style={styles.thumbnail}
            source={{uri: item.thumbnail_url}}
          />
          <View
            style={styles.book__info}>
              <Text>{item.title}</Text>
              <Text>{item.author}</Text>
          </View>
        </View>
        <View style={styles.add__button__container}>
          <Button 
            style={styles.add__button}
            title="+"
            onPress={(e) => {
              e.preventDefault();
              onSubmit(item);
            }}
          ></Button>
        </View>
      </View>
    );
    
    const itemSeparator = () => {
      return <View style={styles.separator} />;
    };

    return (
      <View style={styles.input__container}>
          <View style={styles.book__search}>
            <View style={styles.input}>
              <Controller
                  control={control}
                  rules={{
                  required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                      placeholder='Enter your book title'
                      onBlur={onBlur}
                      onChangeText={(text) => setBookTitle(text)}
                      defaultValue={bookTitle}
                  />
                  )}
                name="isbn"
              />
            </View>

            <View style={styles.condition}>
              <Text>Set Condition: </Text>
              <Controller
                  control={control}
                  rules={{
                  required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                  <SelectDropdown
                        style = {styles.dropDown}
                        data={conditions}
                        onSelect={(selectedItem, index)=>{
                          setCondition(selectedItem);
                        }}
                        />
                  )}
                  name="condition"
            />
            </View>
          </View>
          <TouchableOpacity>
            <Button title='SEARCH' onPress={fetchBooks}/>
          </TouchableOpacity>
          <SafeAreaView>
            <FlatList 
              style={styles.book__results}
              persistentScrollbar
              data={bookResults}
              numColumns={2}
              renderItem={renderBook}
              ItemSeparatorComponent={itemSeparator}
              showsHorizontalScrollIndicator={false}
              >
            </FlatList>
          </SafeAreaView>
      </View>
  );
};

const styles = StyleSheet.create({
  input__container: {
    border: 0,
    margin: 0,
    flexDirection: 'column',
    width: '100%',
    height: '90%',
  },
  book__search: {
    flexDirection: 'row',
    height: '15%',
    width: '100%',
  },
  book__results: {
    width: '100%',
    height: '80%',
    flexWrap: 'wrap',
  },
  condition: {
    width: '50%',
  },
  book__card__container: {
    width: '50%',
    height: 350,
    flexDirection: 'column',
  },
  book__card: {
    flexDirection: 'column',
    width: '100%',
    height: '85%',
    borderWidth: .2,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  book__info: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    marginTop: 5,
    borderRadius: 8,
    height: 200,
    width: 120,
  },
  dropDown:{
  },
  baseText: {
    fontFamily: "Cochin",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input:{
    width: '50%',
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
  separator: {
    height: 2,
    width: '100%',
  },
});

export default AddBooks;

        