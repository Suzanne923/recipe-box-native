import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FontText from './font-text';

const Tag = (props) => (
  <View style={styles.container}>
    <FontText style={styles.text}>{props.tag}</FontText>
  </View>
);

export default Tag;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#e7e7e7",
    borderRadius: 10
  },
  text: {
    color: "#333",
    fontFamily: "open-sans-regular",
    fontSize: 18,
  }
})
