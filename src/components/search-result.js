import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SearchResult = (props) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      <Text style={[styles.text, {fontFamily: "OpenSans-Bold"}]}>{`${props.i + 1}. ${props.title} `}</Text>
      <Text>{props.tags} {props.ingredients}</Text>
    </Text>
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
