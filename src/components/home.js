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
    const { fetchRecipes, newFetch, fetchLikedRecipes } = this.props;

    if (newFetch) {
      fetchRecipes();
    }

    fetchLikedRecipes();
  }

  navigateToRecipe = (id) => {
    const { navigate, setRecipe } = this.props;

    setRecipe(id);
    navigate(screens.RECIPE);
  }

  likeRecipe = (id) => {
    const { likeRecipe, userId } = this.props;

    likeRecipe(id, userId);
  }

  render() {
    const { recipes, isLoading, likedRecipes } = this.props;
    const recipeList = recipes.map(recipe => (
      <RecipeItem
        key={recipe.id}
        recipe={recipe}
        onPress={() => { this.navigateToRecipe(recipe.id); }}
        onLike={(id) => { this.likeRecipe(id); }}
        isLiked={likedRecipes.indexOf(recipe.id) > -1}
      />
    ));

    return (
      <View style={styles.container}>
        { isLoading && <Loading /> }
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
  isLoading: PropTypes.bool.isRequired,
  likeRecipe: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  likedRecipes: PropTypes.arrayOf(PropTypes.number).isRequired,
  fetchLikedRecipes: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  setRecipe: ownProps.setRecipe,
  newFetch: state.recipes.newFetch,
  recipes: state.recipes.storedRecipes,
  isLoading: state.recipes.isLoading,
  userId: state.auth.id,
  likedRecipes: state.recipes.likedRecipes
});

export default connect(mapStateToProps, actions)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
