import React, { useState } from "react";
import { TouchableOpacity, Text, TextInput, StyleSheet, View, Button} from "react-native";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

type FormData = {
    isbn: string;
    booktitle: string;
    condition: number
};

const AddBooks = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
          isbn: '',
          booktitle: '',
          condition: 0
        }
      });
    const [data, setData] = useState("");
    
    //onSubmit, POST the book
    const onSubmit = handleSubmit(data => console.log(data));

    axios.post('https://binderapp-server.herokuapp.com/api/user_books', {
        isbn: 'isbn',
        condition:'int'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    return (
        <View>
            <Text>ISBN:</Text>
            <Controller
                control={control}
                rules={{
                required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    placeholder='enter ISBN'
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
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
            name="booktitle"
            /> */}
            <Text>Condition:</Text>
            <Controller
                control={control}
                rules={{
                required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    placeholder='enter a number 1-10'
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
            />
            )}
            name="condition"
        />
            <View>
                <TouchableOpacity>
                <Button title='SUBMIT'/>
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

        