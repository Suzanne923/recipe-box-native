import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
import * as actions from '../actions';

import Loading from './loading';
import placeholder from '../images/placeholder.png';
import Tag from './tag';
import screens from '../screens';
import FontText from './font-text';

class ViewRecipe extends React.Component {
  componentWillMount() {
    const { fetchRecipe, id, recipe } = this.props;

    if (recipe.id != id) {
      fetchRecipe(id);
    }
  }

  navigateToSearch = (string) => {
    const { searchRecipes, navigate } = this.props;
    navigate(screens.SEARCH, string);
    searchRecipes(string);
  }

  render() {
    const { isLoading, recipe } = this.props;
    const tags = recipe.tags.map((tag, i) => (
      <TouchableOpacity
        onPress={() => {this.navigateToSearch(tag)}}
        key={i}
        underlayColor="rgba(255, 255, 255, 0.2)"
      >
        <Tag tag={tag} />
      </TouchableOpacity>
    ));
    const ingredients = recipe.ingredients.map((ingredient, i) => <FontText style={styles.text} key={i}>{`${ingredient.amount} ${ingredient.measure} ${ingredient.name}`}</FontText>);
    const instructions = recipe.instructions.map((item, i) => <FontText style={styles.text} key={i}>{`${i + 1}. ${item}.`}</FontText>);

    const image = recipe.image_url ? { uri: recipe.image_url } : placeholder;

    return (
      <View>
        { isLoading ? <Loading /> : (
          <View style={styles.container}>
            <Image style={styles.image} source={image} />
              <FontText style={styles.title}>{recipe.title}</FontText>
              <View style={{flexDirection: "row"}}>{tags}</View>
            <FontText style={styles.subTitle}>Ingredients:</FontText>
            <View>{ingredients}</View>
            <View
              style={{
                borderBottomColor: '#333',
                borderBottomWidth: 1,
              }}
            />
          <FontText style={styles.subTitle}>Instructions:</FontText>
            <View style={{ paddingLeft: 10, paddingRight: 10}}>{instructions}</View>
          </View>)}
      </View>
    );
  }
};

const mapStateToProps = (state) => ({
  isLoading: state.recipes.isLoading,
  recipe: state.recipes.selectedRecipe
});

export default connect(mapStateToProps, actions)(ViewRecipe);

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: DEVICE_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  title: {
    fontSize: 28,
    fontFamily: "OpenSans-SemiBold",
    color: "#333",
    margin: 5
  },
  subTitle: {
    color: "#333",
    fontFamily: "OpenSans-Bold",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20
  },
  imageContainer: {
    height: 250
  },
  image: {
    height: 250,
    alignSelf: "stretch",
    flex: 1,
  },
  text: {
    fontFamily: "OpenSans-Regular",
    color: "#333",
    paddingTop: 10,
    fontSize: 18
  }
});
