import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

//this is where we can switch between screens 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <View style={styles.container}>
          <Text>Binder App Home Page</Text>
          <StatusBar style="auto" />
        </View>
      </Stack.Navigator>
      
    </NavigationContainer>
    
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
