import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import Input from './input';
import SearchResult from './search-result';
import Icon from './icon';
import * as actions from '../actions';
import screens from '../screens';

class Search extends React.Component {
  constructor() {
    super();
    this.state = { query: '' };
  }

  componentWillMount() {
    const { resetSearch } = this.props;

    resetSearch();
  }

  deleteInput = () => {
    this.setState({ query: '' });
  }

  handlePress = (id) => {
    const { navigate, setRecipe } = this.props;

    setRecipe(id);
    navigate(screens.RECIPE);
  }

  handleSubmit = () => {
    const { searchRecipes } = this.props;
    const { query } = this.state;

    if (query !== '') {
      searchRecipes(query);
    }
  }

  handleInputChange = (value) => {
    this.setState({ query: value });
  }

  renderResults = () => {
    const { searchResults, searchProp } = this.props;
    const { query } = this.state;
    const queryString = searchProp || query;

    return searchResults.length ? (
      <View style={styles.searchContainer}>
        <Text style={styles.text}>Results for
          <Text style={{ fontFamily: "OpenSans-Italic" }}>{`'${queryString}'`}</Text>
        </Text>
        {
          searchResults.map((result, i) => {
            const tagsStr = result.tags && result.tags.join(', ');
            const ingredientsStr = result.ingredients && result.ingredients.join(', ');

            return (
              <SearchResult
                key={result.recipe_id}
                i={i}
                id={result.recipe_id}
                title={result.title}
                tags={tagsStr}
                ingredients={ingredientsStr}
                onPress={() => this.handlePress(result.recipe_id)}
              />
            );
          })
        }
      </View>
    ) : null;
  }

  render() {
    const { query } = this.state;

    return (
      <View>
        <View style={styles.searchbarContainer}>
          <Icon style={[styles.iconContainer, { marginLeft: 10 }]} onPress={this.handleSubmit}>
            <Ionicons name="ios-search" size={27} color="white" />
          </Icon>
          <Input
            value={query}
            inputStyle={styles.input}
            placeholder="Search recipes..."
            onChangeText={this.handleInputChange}
            onSubmitEditing={this.handleSubmit}
          />
          <Icon style={[styles.iconContainer, { marginRight: 10 }]} onPress={this.deleteInput}>
            <Entypo name="cross" size={27} color="white" />
          </Icon>
        </View>
        {this.renderResults()}
      </View>
    );
  }
}

Search.propTypes = {
  resetSearch: PropTypes.func.isRequired,
  searchRecipes: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  searchProp: PropTypes.any,
  setRecipe: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired
};

Search.defaultProps = { searchProp: null };

const mapStateToProps = (state, ownProps) => ({
  searchProp: state.nav.navProp,
  setRecipe: ownProps.setRecipe,
  searchResults: state.recipes.searchResults
});

export default connect(mapStateToProps, actions)(Search);

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  searchbarContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(180, 180, 180, 0.6)",
    borderRadius: 20
  },
  input: {
    alignSelf: "center",
    justifyContent: "center",
    marginLeft: 10,
    fontSize: 18,
    color: "#fff",
    width: DEVICE_WIDTH - 100
  },
  iconContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchContainer: {
    marginTop: 10,
    backgroundColor: "white"
  },
  text: {
    marginTop: 5,
    marginLeft: 10,
    fontFamily: "OpenSans-Regular",
    fontSize: 18,
    color: "#333"
  }
});
