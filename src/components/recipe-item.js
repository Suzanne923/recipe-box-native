import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RecipeItem = ({ recipe, onPress, onLike, isLiked }) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={() => { onPress(); }}
      style={styles.imageContainer}
      underlayColor="#eee"
    >
      <Image style={styles.image} source={{ uri: recipe.image_url }} />
      <View style={styles.likeContainer}>
        <TouchableOpacity style={styles.likeButton} onPress={() => { onLike(recipe.id); }}>
          <FontAwesome name="heart" size={40} color={isLiked ? "red" : "white"} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
    <Text style={styles.title}>{recipe.title}</Text>
  </View>
);

RecipeItem.propTypes = {
  recipe: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired
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
  likeContainer: {
    position: "absolute",
    top: 15,
    right: 15,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#333"
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
