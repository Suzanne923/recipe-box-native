import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FontText from './font-text';

const SearchResult = (props) => (
  <View style={styles.container}>
    <FontText style={styles.text}>
      <FontText style={[styles.text, {fontFamily: "open-sans-bold"}]}>{`${props.i + 1}. ${props.title} `}</FontText>
      <FontText>{props.tags} {props.ingredients}</FontText>
    </FontText>
  </View>
);

export default SearchResult;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    padding: 10
  },
  text: {
    color: "#333",
    fontFamily: "open-sans-regular",
    fontSize: 16,
    backgroundColor: "white",
  }
});
