import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, AsyncStorage, View, BackHandler, ScrollView } from 'react-native';
import * as actions from '../actions';
import screens from '../screens';

import Loading from './loading';
import Home from './home';
import Signin from './auth/signin';
import Signup from './auth/signup';
import Header from './header';
import Menu from './menu';
import Profile from './profile';
import ViewRecipe from './view-recipe';
import Search from './search';
import AddRecipe from './add-recipe';

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = { id: null };
  }

  async componentWillMount() {
    const { fetchUser, navigate } = this.props;
    const token = await AsyncStorage.getItem('recipeToken');

    if (token) {
      fetchUser(token, () => { navigate(screens.HOME); });
    } else {
      navigate(screens.SIGNIN);
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { navigation, navigateBack } = this.props;

      if (navigation.history.length) {
        navigateBack();
        return true;
      }
      return false;
    });
  }

  setRecipe = newId => this.setState({ id: newId });

  getScreen(screen) {
    const { id } = this.state;

    switch (screen) {
      case screens.HOME:
        return <Home setRecipe={(newId) => { this.setRecipe(newId); }} />;
      case screens.PROFILE:
        return <Profile setRecipe={(newId) => { this.setRecipe(newId); }} />;
      case screens.RECIPE:
        return <ViewRecipe id={id} />;
      case screens.SEARCH:
        return <Search setRecipe={(newId) => { this.setRecipe(newId); }} />;
      case screens.ADDRECIPE:
        return <AddRecipe />;
      case screens.SIGNIN:
        return <Signin />;
      case screens.SIGNUP:
        return <Signup />;
      case screens.DEFAULT:
        return <Loading />;
      default:
        return <Loading />;
    }
  }

  render() {
    const {
      navigate,
      navigation: { screen },
      authenticated
    } = this.props;

    return (
      <View style={styles.container}>
        <Header />
        <ScrollView>
          {this.getScreen(screen)}
        </ScrollView>
        { authenticated && <Menu onPress={(newScreen) => { navigate(newScreen); }} /> }
      </View>
    );
  }
}

Navigation.propTypes = {
  navigate: PropTypes.func.isRequired,
  navigation: PropTypes.any.isRequired,
  navigateBack: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  navigation: state.nav,
  authenticated: state.auth.authenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps, actions)(Navigation);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#777',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
