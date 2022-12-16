import React from "react";
import { Text, View } from "./Themed";
import { Modal, SafeAreaView, StyleSheet, Button } from 'react-native'

interface ReputationModalProps {
    text: string;
    buttonText: string;
    visible: boolean;
    onClose: () => void;
}

const ReputationModal = (props: ReputationModalProps) => {
    const {text, buttonText, onClose, visible} = props;
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modal}>
                <View style={styles.modalContentWrapper}>
                    <View style={styles.modalContent}>
                        <Text></Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0,3)',
    },
    modalContentWrapper: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: 'white',
        marginVertical: 16,
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 50,
    },
});

export default ReputationModal;