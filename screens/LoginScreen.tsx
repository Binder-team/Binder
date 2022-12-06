import { StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

//this is the main page where user swipes on a book or not. for now, just two buttons
export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please enter your name:</Text>
      <TextInput placeholder='name'></TextInput>
      <Text style={styles.title}>Please enter your password:</Text>
      <TextInput placeholder='password'></TextInput>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/BookMatchingScreen.tsx" />
    
    
    <TouchableOpacity>
        <Button title='SUBMIT'/>
    </TouchableOpacity>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
