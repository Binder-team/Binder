import { useEffect, useState } from 'react';
import { Platform, StyleSheet,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookCard from '../components/BookCard';
import { Book } from '../types';
import { getUsername } from '../components/userTokenManager';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { Card } from 'react-native-paper';

const ConfirmExchange = () => {
    
    const tradeBook = ({ item }) => (
            <View style={styles.item}>
            <View style={styles.bookContainer}> 
                <Image
                style={{
                    borderColor: 'black',
                    borderWidth: 2,
                    height: 100,
                    width: 100,
                }}
                source={{
                    uri: item.thumbnail1,
                    width: 50,
                    height: 50,
                }}
                />
                <Text>Title:{item.title1}</Text>
                <Text>Author:{item.author1}</Text>
                <Text>Condition:{item.condition1}</Text>
                <Text>User:{item.username1}</Text>
                <Text>Contact:{item.email1}</Text> 
            </View>  
            <View style={styles.bookContainer}>
                
                <Image
                style={{
                    borderColor: 'black',
                    borderWidth: 2,
                    height: 100,
                    width: 100,
                }}
                source={{
                    uri: item.thumbnail2,
                    width: 50,
                    height: 50,
                }}
                />
                <Text>Title:{item.title2}</Text>
                <Text>Author:{item.author2}</Text>
                <Text>Condition:{item.condition2}</Text>
                <Text>User:{item.username2}</Text>
                <Text>Contact:{item.email2}</Text>
            </View>
            
            </View>
        );


}
    