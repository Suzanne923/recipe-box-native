import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, BackHandler, ScrollView } from 'react-native';
import { AsyncStorage } from "react-native";
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

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {
      id: null
    }
  }

  async componentWillMount() {
    const { fetchUser, navigate } = this.props;
    const token = await AsyncStorage.getItem('recipeToken');
    if (token) {
      fetchUser(token, () => { navigate(screens.HOME) });
    }
  }

  componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', () => {
      const { navigation, navigateBack, fontLoader } = this.props;
			if(navigation.history.length) {
				navigateBack();
				return true;
			}
			return false;
		});
  }

  getScreen(screen) {
    const { loading } = this.props;
    const { id } = this.state;

    switch(screen) {
      case screens.HOME:
        return <Home setRecipe={(id) => {this.setState({ id })}} />;
      case screens.PROFILE:
        return <Profile />;
      case screens.RECIPE:
        return <ViewRecipe id={id} />;
      case screens.SEARCH:
        return <Search setRecipe={(id) => {this.setState({ id })}} />;
      case screens.SIGNIN:
        return <Signin />;
      case screens.SIGNUP:
        return <Signup />;
      case screens.DEFAULT:
        return <Loading />;
    }
  }

  render() {
    const { navigate, navigation: { screen }, authenticated } = this.props;

    return (
      <View style={styles.container}>
        <Header />
        <ScrollView>
          {this.getScreen(screen)}
        </ScrollView>
        { authenticated && <Menu onPress={(screen) => navigate(screen)} /> }
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
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
