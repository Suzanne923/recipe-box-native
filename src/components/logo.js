import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import FontText from './font-text';
import logo from '../images/logo.png';

const Logo = () => {
  return(
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <FontText style={styles.text}>RECIPE BOX</FontText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    fontFamily: "open-sans-bold",
    backgroundColor: "transparent",
    marginTop: 20,
  }
});

export default Logo;
