import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import screens from '../../screens';
import * as actions from '../../actions';

import AuthMenu from './auth-menu';
import Logo from '../logo';
import Input from '../input';
import Submitbutton from './submit-button';
import ErrorMessage from './error-message';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      error: ''
    };
  }

  validate = () => {
    const {
      email,
      password,
      passwordConfirm
    } = this.state;

    ["email", "password", "passwordConfirm"].forEach((item) => {
      // eslint-disable-next-line
      if (!this.state[item]) {
        this.setState({ error: { [item]: "Is Required!" } });
        return false;
      }
    });

    if (password !== passwordConfirm) {
      this.setState({ error: 'Passwords must match!' });
      return false;
    }

    if (email && password) {
      return true;
    }
  }

  handleSubmit = () => {
    const {
      signupUser,
      navigate
    } = this.props;
    const { email, password } = this.state;

    signupUser({ email, password }, () => { navigate(screens.HOME); });
  }

  handleInputChange = property => (value) => {
    this.setState({ [property]: value });
  }

  render() {
    const {
      isLoading,
      screen,
      navigate
    } = this.props;
    const { error } = this.state;

    return (
      <View>
        <AuthMenu screen={screen} navigate={navigate} />
        <Logo />
        <KeyboardAvoidingView>
          <Input
            inputStyle={styles.input}
            placeholder="Email"
            secureTextEntry={false}
            onChangeText={this.handleInputChange('email')}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="done"
          />
          { error.passwordConfirm ? <ErrorMessage errorMessage={error} /> : null }
          <Input
            inputStyle={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={this.handleInputChange('password')}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="done"
          />
          { error.passwordConfirm ? <ErrorMessage errorMessage={error} /> : null }
          <Input
            inputStyle={styles.input}
            placeholder="Confirm password"
            secureTextEntry
            onChangeText={this.handleInputChange('passwordConfirm')}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="done"
          />
          { error.passwordConfirm ? <ErrorMessage errorMessage={error} /> : null }
          <Submitbutton
            isLoading={isLoading}
            onSubmit={this.handleSubmit}
            validate={this.validate}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

Signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  screen: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  screen: state.nav.screen
});

export default connect(mapStateToProps, actions)(Signup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
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
    textAlign: "center"
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d84242',
    borderRadius: 20,
    padding: 9
  }
});
