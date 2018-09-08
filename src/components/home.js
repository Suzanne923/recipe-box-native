import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import * as actions from '../actions';
import screens from '../screens';

import Loading from './loading';
import RecipeItem from './recipe-item';

class Home extends React.Component {
  componentDidMount() {
    const { fetchRecipes, newFetch } = this.props;

    if (newFetch) {
      fetchRecipes();
    }
  }

  navigateToRecipe = (id) => {
    const { navigate, setRecipe } = this.props;

    setRecipe(id);
    navigate(screens.RECIPE);
  }

  render() {
    const { signinUser, recipes, isLoading, navigate } = this.props;
    const recipeList = recipes.map(recipe => <RecipeItem key={recipe.id} recipe={recipe} onPress={() => {this.navigateToRecipe(recipe.id)}} />);

    return (
      <View style={styles.container}>
        { isLoading ? <Loading /> : null }
        {recipeList}
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  setRecipe: ownProps.setRecipe,
  newFetch: state.recipes.newFetch,
  recipes: state.recipes.storedRecipes,
  isLoading: state.recipes.isLoading
});

export default connect(mapStateToProps, actions)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
