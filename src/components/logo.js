import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import logo from '../images/logo.png';

const Logo = () => (
  <View style={styles.container}>
    <Image source={logo} style={styles.image} />
    <Text style={styles.text}>RECIPE BOX</Text>
  </View>
);


const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    marginTop: 30,
    width: 100,
    height: 100
  },
  text: {
    color: "white",
    fontSize: 20,
    fontFamily: "OpenSans-Bold",
    backgroundColor: "transparent",
    marginTop: 20
  }
});

export default Logo;
