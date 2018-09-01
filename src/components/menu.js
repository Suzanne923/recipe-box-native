import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import screens from '../screens';

const Menu = (props) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          underlayColor="rgba(255, 255, 255, 0.2)"
          onPress={() => {props.onPress(screens.SEARCH)}}
          style={styles.icon}
        >
          <Ionicons name="ios-search" size={36} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          underlayColor="rgba(255, 255, 255, 0.2)"
          onPress={() => {props.onPress(screens.HOME)}}
          style={styles.icon}
        >
          <Ionicons name="md-home" size={36} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          underlayColor="rgba(255, 255, 255, 0.2)"
          onPress={() => {props.onPress(screens.PROFILE)}}
          style={styles.icon}
        >
          <FontAwesome name="user-circle" size={36} color="white" />
        </TouchableOpacity>
      </View>
    );
}

export default Menu;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: "#a92b00",
    alignSelf: "stretch"
  },
  icon: {
    marginLeft: 20,
    marginRight: 20
  }
});
