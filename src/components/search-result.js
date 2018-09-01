import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FontText from './font-text';

const SearchResult = (props) => (
  <View style={styles.container}>
    <FontText style={styles.text}>
      <FontText style={[styles.text, {fontFamily: "OpenSans-Bold"}]}>{`${props.i + 1}. ${props.title} `}</FontText>
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
    fontFamily: "OpenSans-Regular",
    fontSize: 18,
    backgroundColor: "white",
  }
});
