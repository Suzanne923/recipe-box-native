import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
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
    const { recipes, isLoading } = this.props;
    const recipeList = recipes.map(recipe => (
      <RecipeItem
        key={recipe.id}
        recipe={recipe}
        onPress={() => { this.navigateToRecipe(recipe.id); }}
      />
    ));

    return (
      <View style={styles.container}>
        { isLoading ? <Loading /> : null }
        {recipeList}
      </View>
    );
  }
}

Home.propTypes = {
  fetchRecipes: PropTypes.func.isRequired,
  newFetch: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired,
  setRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired
};

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
