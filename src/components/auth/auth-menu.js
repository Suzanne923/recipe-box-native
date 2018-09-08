import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Dimensions from 'Dimensions';
import screens from '../../screens';

const AuthMenu = ({ screen, navigate }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={[styles.button, screen === screens.SIGNIN ? { borderColor: "#fff"} : { borderColor: "#bbb"}]}
      onPress={() => navigate(screens.SIGNIN)}
    >
      <Text style={styles.text}>SIGN IN</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.button, screen === screens.SIGNUP ? { borderColor: "#fff"} : { borderColor: "#bbb"}]}
      onPress={() => navigate(screens.SIGNUP)}
    >
      <Text style={styles.text}>SIGN UP</Text>
    </TouchableOpacity>
  </View>
);

export default AuthMenu;

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: DEVICE_WIDTH,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    width: DEVICE_WIDTH / 2,
    alignItems: "center",
    borderBottomWidth: 2
  },
  text: {
    fontSize: 20,
    fontFamily: "OpenSans-SemiBold",
    color: "white"
  }
});
