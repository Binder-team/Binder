import { StyleSheet} from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { TextInput } from 'react-native-paper';
import AddBooks from '../components/AddBook';

export default function AddBooksScreen() {
  const addBook = AddBooks();
  return (
    <View style={styles.container}>
        {addBook}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    border: 0,
    margin: 0,
    height: '100%',
    width: '100%'
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
