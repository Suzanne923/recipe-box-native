import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import logo from '../images/logo2.png';
import screens from '../screens';
import FontText from './font-text';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <FontText style={styles.headerText}>Recipe Box</FontText>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  header: {
    padding: 8,
    backgroundColor: "#a92b00",
    alignSelf: "stretch",
    justifyContent: "center"
  },
  headerText: {
    color: "#fff",
    fontFamily: 'open-sans-semi-bold',
    textAlign: "center",
    fontSize: 30,
    marginLeft: 5
  }
});
