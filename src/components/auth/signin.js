import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, KeyboardAvoidingView, Alert } from 'react-native';
import screens from '../../screens';
import * as actions from '../../actions';

import AuthMenu from './auth-menu';
import Logo from '../logo';
import Input from '../input';
import Submitbutton from './submit-button';

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: { email: false, password: false }
    };

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  componentDidUpdate() {
    const { error, resetAuthError } = this.props;

    if (error) {
      Alert.alert('', error, [
        {
          text: 'OK',
          onPress: () => {
            this.inputs['one'].focus();
            resetAuthError();
          }
        }
      ]);
    }
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  validate = () => {
    const {
      email,
      password,
      error
    } = this.state;

    ["email", "password"].forEach((item) => {
      // eslint-disable-next-line
      if (!this.state[item]) {
        const newError = error;
        newError[item] = true;

        this.setState({ error: newError });
        return false;
      }
    });

    if (email && password) {
      return true;
    }
  }

  handleInputChange = property => (value) => {
    const {
      email,
      password,
      error
    } = this.state;

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

  handleSubmit = () => {
    const { signinUser, navigate } = this.props;
    const { email, password } = this.state;

    signinUser({ email, password }, () => { navigate(screens.HOME); });
  }

  render() {
    const {
      isLoading,
      navigate,
      screen
    } = this.props;
    const { error } = this.state;

    return (
      <View>
        <AuthMenu screen={screen} navigate={navigate} />
        <Logo />
        <KeyboardAvoidingView style={{ alignSelf: "stretch" }}>
          <Input
            inputStyle={[styles.input, error.email && { borderColor: "red", borderWidth: 2 }]}
            placeholder="Email"
            onSubmitEditing={() => { this.focusNextField('two'); }}
            returnKeyType="next"
            onChangeText={this.handleInputChange('email')}
            getRef={(input) => { this.inputs['one'] = input; }}
          />
          <Input
            inputStyle={[styles.input, error.password && { borderColor: "red", borderWidth: 2 }]}
            placeholder="Password"
            secureTextEntry
            onChangeText={this.handleInputChange('password')}
            getRef={(input) => { this.inputs['two'] = input; }}
          />
          <Submitbutton
            isLoading={isLoading}
            validate={this.validate}
            onSubmit={this.handleSubmit}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

Signin.propTypes = {
  signinUser: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  screen: PropTypes.number.isRequired,
  error: PropTypes.string,
  resetAuthError: PropTypes.func.isRequired
};

Signin.defaultProps = { error: '' };

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  screen: state.nav.screen,
  error: state.auth.error
});

export default connect(mapStateToProps, actions)(Signin);

const styles = StyleSheet.create({
  container: { flex: 1 },
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
