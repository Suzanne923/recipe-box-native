import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Tag = props => (
  <View style={styles.container}>
    <Text style={styles.text}>{props.tag}</Text>
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
    fontFamily: "OpenSans-Regular",
    fontSize: 18,
  }
})
