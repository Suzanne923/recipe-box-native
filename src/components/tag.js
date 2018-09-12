import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

const Tag = ({ tag }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{tag}</Text>
  </View>
);

Tag.propTypes = { tag: PropTypes.string.isRequired };

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
    fontSize: 18
  }
});
