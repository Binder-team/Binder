import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import { onChange } from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export type Props = {
    labelValue: string,
    placeholderText: string,
}

export default function FormInput ({ labelValue, placeholderText, ...rest }: Props) {
  return (
    <TextInput
      value={labelValue}
      style={styles.input}
      numberOfLines={1}
      placeholder={placeholderText}
      placeholderTextColor='#666'
      {...rest}
    />
  );
}
const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  }
});