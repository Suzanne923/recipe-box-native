import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import logo from '../images/logo2.png';
import screens from '../screens';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Recipe Box</Text>
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
    fontFamily: 'OpenSans-SemiBold',
    textAlign: "center",
    fontSize: 30,
    marginLeft: 5
  }
});
