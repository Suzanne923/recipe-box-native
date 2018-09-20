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

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      error: {
        email: false,
        password: false,
        passwordConfirm: false
      }
    };

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  validate = () => {
    const { email, password, passwordConfirm, error } = this.state;

    ["email", "password", "passwordConfirm"].forEach((item) => {
      // eslint-disable-next-line
      if (!this.state[item]) {
        const newError = error;
        newError[item] = true;

        this.setState({ error: newError });
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
    const { signupUser, navigate } = this.props;
    const { email, password } = this.state;

    signupUser({ email, password }, () => { navigate(screens.HOME); });
  }

  handleInputChange = property => (value) => {
    this.setState({ [property]: value });
  }

  render() {
    const { isLoading, screen, navigate } = this.props;
    const { email, password, passwordConfirm, error } = this.state;

    return (
      <View>
        <AuthMenu screen={screen} navigate={navigate} />
        <Logo />
        <KeyboardAvoidingView>
          <Input
            value={email}
            inputStyle={[styles.input, error.email && { borderColor: "red", borderWidth: 2 }]}
            placeholder="Email"
            onSubmitEditing={() => { this.focusNextField('two'); }}
            returnKeyType="next"
            onChangeText={this.handleInputChange('email')}
            getRef={(input) => { this.inputs['one'] = input; }}
          />
          <Input
            value={password}
            inputStyle={[styles.input, error.password && { borderColor: "red", borderWidth: 2 }]}
            placeholder="Password"
            secureTextEntry
            onSubmitEditing={() => { this.focusNextField('three'); }}
            returnKeyType="next"
            onChangeText={this.handleInputChange('password')}
            getRef={(input) => { this.inputs['two'] = input; }}
          />
          <Input
            value={passwordConfirm}
            inputStyle={[styles.input, error.passwordConfirm && { borderColor: "red", borderWidth: 2 }]}
            placeholder="Confirm password"
            secureTextEntry
            onChangeText={this.handleInputChange('passwordConfirm')}
            getRef={(input) => { this.inputs['three'] = input; }}
          />
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
