import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableHighlight, Button } from 'react-native';
import screens from '../../screens';
import * as actions from '../../actions';

import AuthMenu from './auth-menu';
import Logo from '../logo';
import Input from '../input';
import Submitbutton from './submit-button';
import ErrorMessage from './error-message';

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: { email: false, password: false }
    }
  }

  handleInputChange = (property) => (value) => {
    const { email, password, error } = this.state;

    this.setState({ [property]: value });

    if (email && error.email) {
      const newError = error;
      error.email = false;

      this.setState({ error: newError });
    }
    if (password && error.password) {
      const newError = error;
      error.password = false;

      this.setState({ error: newError });
    }
  }

  validate = () => {
    const { email, password } = this.state;

    ["email", "password"].forEach(item => {
      if (!this.state[item]) {
        const newError = this.state.error;
        newError[item] = true;

        this.setState({ error: newError });
        return false;
      }
    });

    if (email && password) {
      return true;
    }
  }

  handleSubmit = () => {
    const { signinUser, navigate } = this.props;
    const { email, password } = this.state;

    signinUser({ email, password }, () => { navigate(screens.HOME) });
  }

  render() {
    const { isLoading, navigate, screen } = this.props;
    const { error } = this.state;

    return (
      <View>
        <AuthMenu screen={screen} navigate={navigate} />
        <Logo />
          <KeyboardAvoidingView style={{alignSelf: "stretch"}}>
            <Input
              inputStyle={[styles.input, error.email ? { borderColor: "red", borderWidth: 2 } : null]}
              placeholder="Email"
              secureTextEntry={false}
              onChangeText={this.handleInputChange('email')}
              autoCorrect={false}
              autoCapitalize={'none'}
              returnKeyType={'done'}
            />
            <Input
              inputStyle={[styles.input, error.password ? { borderColor: "red", borderWidth: 2 } : null]}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={this.handleInputChange('password')}
              autoCorrect={false}
              autoCapitalize={'none'}
              returnKeyType={'done'}
            />
            <Submitbutton
              isLoading={isLoading}
              validate={this.validate}
              handleSubmit={this.handleSubmit}
            />
          </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  screen: state.nav.screen
});

export default connect(mapStateToProps, actions)(Signin);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginTop: 10,
    height: 40,
    paddingLeft: 15,
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    color: "#fff",
    alignSelf: "stretch",
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "rgba(150, 150, 150, 0.6)",
    borderRadius: 20
  },
  text: {
    marginTop: 5,
    color: "#eee",
    fontFamily: "OpenSans-Regular",
    textAlign: "center"
  }
});
