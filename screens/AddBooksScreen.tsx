import { StyleSheet} from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { TextInput } from 'react-native-paper';

export default function AddBooksScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a book</Text>
        <View>
          <Text>ISBN:</Text>
          <TextInput placeholder='enter ISBN'/>
          <Text>Book Title:</Text>
          <TextInput placeholder='enter book title'/>
          <Text>Condition</Text>
          <TextInput placeholder='enter a number from 1 - 10'/>
        </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/AddBooksScreen.tsx"/>
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
