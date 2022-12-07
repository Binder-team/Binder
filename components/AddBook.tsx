import React, { useState } from "react";
import { TouchableOpacity, Text, TextInput, StyleSheet, View, Button} from "react-native";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

type BookData = {
    isbn: string;
    title: string;
    condition: string
};


const AddBooks = () => {

  const [bookTitle, setBookTitle] = useState('');
  const [condition, setCondition] = useState('');

    const { control, handleSubmit, formState: { errors } } = useForm<BookData>({
        defaultValues: {
          isbn: '',
          title: '',
          condition: ''
        }
      });
    
  //   onSubmit, POST the book
  //   const datas = {
  //     "accessInfo": {"accessViewStatus": "SAMPLE", "country": "JP", "embeddable": false, "epub": {"acsTokenLink": "http://books.google.co.jp/books/download/Looking_For_Alaska-sample-epub.acsm?id=gqNh4EbiFh0C&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api", "isAvailable": true}, "pdf": {"isAvailable": false}, "publicDomain": false, "quoteSharingAllowed": false, "textToSpeechPermission": "ALLOWED", "viewability": "PARTIAL", "webReaderLink": "http://play.google.com/books/reader?id=gqNh4EbiFh0C&hl=&source=gbs_api"}, 
  //     "etag": "7GO7o7mFrog", 
  //     "id": "gqNh4EbiFh0C", 
  //     "kind": "books#volume", 
  //     "layerInfo": {"layers": [[Object]]}, 
  //     "saleInfo": {"buyLink": "https://play.google.com/store/books/details?id=gqNh4EbiFh0C&rdid=book-gqNh4EbiFh0C&rdot=1&source=gbs_api", "country": "JP", "isEbook": true, "listPrice": {"amount": 
  //                 1136, "currencyCode": "JPY"}, "offers": [[Object]], "retailPrice": {"amount": 1022, "currencyCode": "JPY"}, "saleability": "FOR_SALE"}, 
  //     "selfLink": "https://www.googleapis.com/books/v1/volumes/gqNh4EbiFh0C", 
  //     "volumeInfo": {"allowAnonLogging": true, "authors": ["John Green"], "averageRating": 4.5, "canonicalVolumeLink": "https://play.google.com/store/books/details?id=gqNh4EbiFh0C", "categories": ["Young Adult Fiction 
  //                   / Coming of Age", "Young Adult Fiction / Romance / Contemporary", "Young Adult Fiction / School & Education / Boarding School & Prep School", "Young Adult Fiction / Social Themes / Death, Grief, Bereavement", "Young Adult Fiction / Loners & Outcasts", "Juvenile Fiction / Love & Romance", "Juvenile Fiction / School & Education"], "contentVersion": "2.17.13.0.preview.2", "description": "<p> The unmissable first novel from bestselling and award-winning author of THE FAULT IN OUR STARS and TURTLES ALL THE WAY DOWN. </p> <p>“In the dark beside me, she smelled of sweat and sunshine and vanilla and on that thin-mooned night I could see little more than her silhouette, but even in the dark, I could see her eyes – fierce emeralds. And beautiful.”</p> <p>BEFORE. Miles Halter’s whole life has been one big non-event until he starts at anything-but-boring Culver Creek Boarding School and meets Alaska Young. Gorgeous, clever, funny and utterly fascinating she 
  //                   pulls Miles into her world, launches him into a new life, and steals his heart. But when tragedy strikes, and Miles comes face-to-face with death he discovers the value of living and loving unconditionally.</p> <p>AFTER: Nothing will ever be the same.</p> <p> Poignant, funny, heartbreaking and compelling, this novel will stay with you forever. </p>", "dimensions": {"height": "20.00 cm"}, "imageLinks": {"extraLarge": 
  //                   "http://books.google.com/books/content?id=gqNh4EbiFh0C&printsec=frontcover&img=1&zoom=6&edge=curl&imgtk=AFLRE70FhSGmRIaPqAUBghs226SliQHJbAcBbz0kf7SNQTXHhfESV6wN8v_DLkNNEqxNE2hjbbzYSI9MYcF1-2TswJ_szOL_mJWXcLzv-gAYyHdDaUU5__xgbdWgqF0n4gClOgiZgGzI&source=gbs_api", "large": "http://books.google.com/books/content?id=gqNh4EbiFh0C&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE73SK9y6gUboQEdRP6aT5C8yxb2pRN0J-FFmQpUCzOexim9nPKrvJCTi_ZEkVqF50Os4IuqRLxxz2F1Bvgj9dctAskayAvzBCEPcNibOUByOgmx_BeejunB5LCQ2tOXoGo1iKR5Z&source=gbs_api", "medium": "http://books.google.com/books/content?id=gqNh4EbiFh0C&printsec=frontcover&img=1&zoom=3&edge=curl&imgtk=AFLRE72EF8vCnVZvX2deMsICIQArnyCFKAkSHKN3IpUgj4i13pwVtmRikgINr63hlk-xKbZ_ogsIAxDn6LT0FhsH4r6UPv4iA7TUXhglBrrvJkNrof4sYc_0T81kLvLaxuvx0ts51oY7&source=gbs_api", "small": "http://books.google.com/books/content?id=gqNh4EbiFh0C&printsec=frontcover&img=1&zoom=2&edge=curl&imgtk=AFLRE72FhMCiL3y31ciAVBKwJHv3vDBUFhi2i
  //                 sMaau6r0ElDN8frCvJwKWTlm5n0iUeS_qW16g_AI88sMhUAOQpmO6KKR8s9Q82nzlwM24hNph9rRFMQ2uVUgJtIA3xjFBqeWQm6TDRJ&source=gbs_api", "smallThumbnail": "http://books.google.com/books/content?id=gqNh4EbiFh0C&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE73fNBBKE0m80y1HxtUjWe5lkquOft3oLczLf4p_MSxZqt0iZcsNhYwEiv5f5eqJfvRQlD_XU6ZsKFzGmJTjEFBLypkdxWWO6DHWWUElNhP_XdsLpEGP0jsvVqcFaOwIfP7TI4J7&source=gbs_api", "thumbnail": "http://books.google.com/books/content?id=gqNh4EbiFh0C&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE716LA6KcRcRHbhpkO83Dh3KJMRElsdzX_-D-x159WW58alovb0LjF-7VVX1jq8lKiWBsAXYpA9R4juTj6gatxcFKVo5NPhXaSBDGFPyAuZ-e8dnuzsPBc7sG8-SjN6iNqqcy0ug&source=gbs_api"}, 

  //                   "industryIdentifiers": [[Object], [Object]], 
  //                   "infoLink": "https://play.google.com/store/books/details?id=gqNh4EbiFh0C&source=gbs_api", 
  //                   "language": "en", 
  //                   "maturityRating": "NOT_MATURE", 
  //                   "pageCount": 272, 
  //                   "panelizationSummary": {"containsEpubBubbles": false, "containsImageBubbles": false}, 
  //                   "previewLink": "http://books.google.co.jp/books?id=gqNh4EbiFh0C&hl=&source=gbs_api",
  //                   "printType": "BOOK", 
  //                   "printedPageCount": 274, 
  //                   "publishedDate": "2012-05-31", 
  //                   "publisher": "HarperCollins UK", 
  //                   "ratingsCount": 45, 
  //                   "readingModes": {"image": false, "text": true}, 
  //                   "title": "Looking For Alaska"}
  // } 
    
    async function onSubmit (): Promise<void> {
      console.log(bookTitle);
      const key = 'AIzaSyAS32GEr_NB25nXnjTjbEBabB8xatzPznE';
      const fetchedData = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&printType=books&orderBy=relevance&key=${key}`);
      const firstBook = fetchedData.data.items[2];
      const fetchedBook = await axios.get(`https://www.googleapis.com/books/v1/volumes/${firstBook.id}?key=${key}`);
      const bookData = fetchedBook.data.volumeInfo;
      console.log(bookData.title);
      console.log(bookData.authors.join(', '));
      console.log(Number(condition));
      console.log(fetchedBook.data.id);
      try {
          await axios.post('https://binderapp-server.herokuapp.com/api/user_books', {
            user_id: 1,
            is_available: true,
            title: bookData.title,
            author: bookData.authors.join(', '),
            condition: Number(condition),
            book_id: fetchedBook.data.id,
            image_url: bookData.imageLinks.large ? bookData.imageLinks.large : null,
            thumbnail_url: bookData.imageLinks.thumbnail ? bookData.imageLinks.thumbnail : null,

          });
      } catch (error) {
        console.log(error + '🔥')
        
      }
    }

    return (
        <View>
            <Text>Title:</Text>
            <Controller
                control={control}
                rules={{
                required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    placeholder='enter Book Title'
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={text => setBookTitle(text)}
                    defaultValue={bookTitle}
            />
            )}
            name="isbn"
            /> 
            {/* <Text>Book Title:</Text>
            <Controller
                onSubmit={onSubmit}
                control={control}
                rules={{
                required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    placeholder='enter the book title'
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
            />
            )}
            name="title"
            /> */}
            <Text>Condition:</Text>
            <Controller
                control={control}
                rules={{
                required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    placeholder='enter a number 1-10 10(best) '
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={number => setCondition(number)}
                    defaultValue={condition} 
            />
            )}
            name="condition"
        />
            <View>
                <TouchableOpacity>
                <Button title='SUBMIT' onPress={onSubmit}/>
            </TouchableOpacity>
            </View>
            
        </View>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  input:{}
});

export default AddBooks;

        