import React, { useState } from "react";
import { Text, View } from "./Themed";
import { Modal, SafeAreaView, StyleSheet, Button, TouchableOpacity, Image, Alert } from 'react-native'

interface ReputationModalProps {
    text: string;
    buttonText: string;
    visible: boolean;
    onClose: () => void;
}

const ReputationModal = (props: ReputationModalProps) => {
    const [defaultRating, setDefaultRating] = useState(2);
    const [maxRating, setMaxRating] = useState([1,2,3,4,5]);
    const {text, buttonText, onClose, visible} = props;

    const starImgFilled = 'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';
    const starImgCorner = 'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true';

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
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modal}>
                <View style={styles.modalContentWrapper}>
                    <View style={styles.modalContent}>
                        <Text style={styles.text}>
                            Rate this exchange
                        </Text>
                        <CustomRatingBar/>
                        <Text style={styles.text}>
                            {defaultRating + ' / ' + maxRating.length}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.button}
                            onPress={() => {
                                Alert.alert(`Exchange Confirmed!`);
                                onClose();
                            }
                        }
                        >
                            <Text>CONFIRM EXCHANGE</Text>
                        </TouchableOpacity>
                        <Button title={buttonText} onPress={onClose}></Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgourndColor: 'blue',
        margin: 10,
    },
    modalContentWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0,3)',
    },
    modalContent: {
        backgroundColor: 'white',
        marginVertical: 16,
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 50,
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        padding: 15,
        backgroundColor: 'green',
    },
});

export default ReputationModal;