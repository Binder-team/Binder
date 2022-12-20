import React, { useState } from "react";
import { Text, View } from "./Themed";
import { StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import { Portal, Modal } from "react-native-paper";
import { Button } from "react-native-paper";
import { getUsername } from "./userTokenManager";
import axios from "axios";

interface ReputationModalProps {
    text: string;
    buttonText: string;
    visible: boolean;
    onClose: () => void;
    setRerender: (arg0:number) => void;
    counter: number;
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
} 
  
const ReputationModal = (props: ReputationModalProps, ) => {
    const {text, buttonText, onClose, visible, item, setRerender} = props;
    let {counter} = props;
    const starImgFilled = 'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';
    const starImgCorner = 'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true';

    const [defaultRating, setDefaultRating] = useState(5);
    const [maxRating, setMaxRating] = useState([1,2,3,4,5]);

    
    const sendConfirmExchange = async (item) => {
        try {
          //sends a request to make isAccepted = true
          const fetchedMatch = await axios.put(
            `https://binderapp-server.herokuapp.com/api/matches/exchange/user/${getUsername()}/${defaultRating}`, item
          );
          const matches = fetchedMatch.data;
          console.log(matches);
          counter++;
          setRerender(counter)
        } catch (err) {
          console.log(err);
        }
      }
    const CustomRatingBar = () => { 
        return (
            <View style={styles.customRatingBar}>
                {
                    maxRating.map((item, key) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                key={item}
                                onPress={() => {setDefaultRating(item)}}
                            >
                                <Image
                                    style={styles.starImg}
                                    source={
                                        item <= defaultRating
                                            ? {uri: starImgFilled}
                                            : {uri: starImgCorner}
                                    }></Image>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
    return (
        <Portal>

            <Modal style={{height: '100%', width: '100%'}} visible={visible} contentContainerStyle={styles.modal}>
                    <View style={styles.modalContentWrapper}>
                        <View style={styles.modalContent}>
                            <Text style={styles.text}>
                                Rate this exchange
                            </Text>
                            <CustomRatingBar/>
                            <Text style={styles.text}>
                                {defaultRating + ' / ' + maxRating.length}
                            </Text>
                            <View style={styles.button__container}>
                                <Button
                                    style={styles.button}
                                    onPress={() => {
                                        sendConfirmExchange(item);
                                        Alert.alert(`Exchange Confirmed!`);
                                        onClose();
                                    }
                                }
                                >
                                    <Text style={styles.buttonText}>Confirm</Text>
                                </Button>
                                <Button style={{color: 'black'}} onPress={onClose}>Cancel</Button>
                            </View>
                        </View>
                    </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContentWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0,3)',
    },
    button__container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        height: '40%',
    },
    customRatingBar: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
    },
    starImg: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },
    text: {
        textAlign: 'center',
        fontSize: 23,
        marginTop: 20,        
    },
    button: {
        fontSize: 25,
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: '#1e86ac',
    },
    buttonText: {
        fontSize: 13,
        color: '#F3F3F3',
        lineHeight: 15,
        fontWeight: '500',
      },
});

export default ReputationModal;