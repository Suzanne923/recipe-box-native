import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import SearchResult from './search-result';
import Dimensions from 'Dimensions';
import * as actions from '../actions';
import screens from '../screens';
import FontText from './font-text';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      query: ''
    }
  }

  componentWillMount() {
    const { resetSearch } = this.props;

    resetSearch();
  }

  handlePress = (id) => {
    const { navigate, setRecipe } = this.props;
    console.log('clicked on search result');

    setRecipe(id);
    navigate(screens.RECIPE);
  }

  renderResults = () => {
    const { searchResults, navigate, searchProp } = this.props;
    const query = searchProp ? searchProp : this.state.query;

    return (searchResults.length) ? (
      <View>
        <FontText style={styles.text}>Results for {`'${query}'`}:</FontText>
        { searchResults.map((result, i) => {
          const tagsStr = result.tags ? result.tags.join(', ') : null;
          const ingredientsStr = result.ingredients ? result.ingredients.join(', ') : null;

          return (
            <TouchableOpacity
              key={i}
              onPress={() => this.handlePress(result.recipe_id)}
              underlayColor="rgba(255, 255, 255, 0.2)"
            >
              <SearchResult
                i={i}
                id={result.recipe_id}
                title={result.title}
                tags={tagsStr}
                ingredients={ingredientsStr}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    ) : null;
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

  render() {
    const { query } = this.state;

    return (
      <View>
        <View style={styles.searchbarContainer}>
          <TouchableOpacity
            style={[styles.iconContainer, {marginLeft: 10}]}
            onPress={this.handleSubmit}
          >
            <Ionicons name="ios-search" size={27} color="white" />
          </TouchableOpacity>
          <TextInput
            value={query}
            style={styles.input}
            placeholder="Search recipes..."
            onChangeText={this.handleInputChange}
            secureTextEntry={false}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType={'done'}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            style={[styles.iconContainer, {marginRight: 10}]}
            onPress={() => {this.setState({ query: '' })}}
          >
            <Entypo name="cross" size={27} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          {this.renderResults()}
        </View>
      </View>
    );
  }
}

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
    backgroundColor: "rgba(150, 150, 150, 0.6)",
    borderRadius: 20
  },
  input: {
    alignSelf: "center",
    justifyContent: "center",
    marginLeft: 10,
    fontSize: 18,
    color: "#fff",
    width: DEVICE_WIDTH - 100,
  },
  iconContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    marginTop: 10,
    backgroundColor: "white"
  },
  text: {
    marginTop: 5,
    marginLeft: 10,
    fontFamily: "open-sans-regular",
    fontSize: 16,
    color: "#333"
  }
});
