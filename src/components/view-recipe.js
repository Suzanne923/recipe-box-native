import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';
import * as actions from '../actions';

import Loading from './loading';
import placeholder from '../images/placeholder.png';
import Tag from './tag';
import screens from '../screens';

class ViewRecipe extends React.Component {
  componentWillMount() {
    const {
      fetchRecipe,
      id,
      recipe
    } = this.props;

    if (recipe.id !== id) {
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
    const tags = recipe.tags.map(tag => (
      <TouchableOpacity
        onPress={() => { this.navigateToSearch(tag.name); }}
        key={tag.id}
        underlayColor="rgba(255, 255, 255, 0.2)"
      >
        <Tag tag={tag.name} />
      </TouchableOpacity>
    ));
    const ingredients = recipe.ingredients.map(ingredient => (
      <Text style={styles.text} key={ingredient.id}>
        {`${ingredient.amount} ${ingredient.measure} ${ingredient.name}`}
      </Text>
    ));
    const instructions = recipe.instructions.map(item => (
      <Text style={styles.text} key={item.id}>
        {`${item.instruction_order}. ${item.name}.`}
      </Text>
    ));
    const image = recipe.image_url ? { uri: recipe.image_url } : placeholder;

    return (
      <View>
        { isLoading ? <Loading /> : (
          <View style={styles.container}>
            <Image style={styles.image} source={image} />
            <Text style={styles.title}>{recipe.title}</Text>
            <View style={{ flexDirection: "row" }}>{tags}</View>
            <Text style={styles.subTitle}>Ingredients:</Text>
            <View style={styles.listContainer}>{ingredients}</View>
            <Text style={styles.subTitle}>Instructions:</Text>
            <View style={styles.listContainer}>{instructions}</View>
          </View>)}
      </View>
    );
  }
}

ViewRecipe.propTypes = {
  fetchRecipe: PropTypes.func.isRequired,
  id: PropTypes.number,
  recipe: PropTypes.any.isRequired,
  searchRecipes: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

ViewRecipe.defaultProps = { id: null };

const mapStateToProps = state => ({
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
  imageContainer: { height: 250 },
  image: {
    height: 250,
    alignSelf: "stretch",
    flex: 1
  },
  listContainer: {
    alignSelf: "stretch",
    paddingLeft: 15,
    paddingRight: 15
  },
  text: {
    fontFamily: "OpenSans-Regular",
    textAlign: "left",
    color: "#333",
    paddingTop: 10,
    fontSize: 18
  }
});
