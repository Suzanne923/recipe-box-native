import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';

const RecipeItem = ({ recipe, onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={() => { onPress(); }}
      style={styles.imageContainer}
      underlayColor="#eee"
    >
      <Image style={styles.image} source={{ uri: recipe.image_url }} />
    </TouchableOpacity>
    <Text style={styles.title}>{recipe.title}</Text>
  </View>
);

RecipeItem.propTypes = {
  recipe: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired
};

export default RecipeItem;

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5,
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
    alignSelf: "stretch"
  },
  image: { flex: 1 }
});
