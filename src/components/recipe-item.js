import React from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
import Dimensions from 'Dimensions';
import FontText from './font-text';

const RecipeItem = ({ recipe, onPress }) => (
  <View style={styles.container}>
    <TouchableHighlight
      onPress={() => {onPress()}}
      style={styles.imageContainer}
      underlayColor="#eee"
    >
      <Image style={styles.image} source={{uri: recipe.image_url}} />
    </TouchableHighlight>
    <FontText style={styles.title}>{recipe.title}</FontText>
  </View>
);

export default RecipeItem;

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    width: DEVICE_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  title: {
    padding: 10,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 26,
    color: "#333"
  },
  imageContainer: {
    height: 250,
    alignSelf: "stretch",
  },
  image: {
    flex: 1,
  }
});
