import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import screens from '../screens';
import MenuButton from './menu-button';

const Menu = ({ onPress }) => (
  <View style={styles.container}>
    <MenuButton onPress={() => { onPress(screens.SEARCH); }}>
      <Ionicons name="ios-search" size={36} color="white" />
    </MenuButton>
    <MenuButton onPress={() => { onPress(screens.HOME); }}>
      <Ionicons name="md-home" size={36} color="white" />
    </MenuButton>
    <MenuButton onPress={() => { onPress(screens.PROFILE); }}>
      <FontAwesome name="user-circle" size={36} color="white" />
    </MenuButton>
    <MenuButton onPress={() => { onPress(screens.ADDRECIPE); }}>
      <Entypo name="plus" size={38} color="white" />
    </MenuButton>
  </View>
);

Menu.propTypes = { onPress: PropTypes.func.isRequired };

export default Menu;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: "#a92b00",
    alignSelf: "stretch"
  }
});
