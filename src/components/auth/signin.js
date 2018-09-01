import React from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableHighlight, Button } from 'react-native';
import Dimensions from 'Dimensions';
import screens from '../../screens';

import Logo from '../logo';
import Input from '../input';
import Submitbutton from './submit-button';
import ErrorMessage from './error-message';

export default class Signin extends React.Component {
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
    const { onSubmit } = this.props;
    const { email, password } = this.state;

    onSubmit({ email, password });
  }

  render() {
    const { isLoading, onNavigate } = this.props;
    const { error } = this.state;

    return (
      <View>
        <Logo />
        <Text style={styles.title}>SIGN IN</Text>
          <KeyboardAvoidingView>
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
            <Text
              onPress={() => onNavigate(screens.SIGNUP)}
              style={styles.text}
            >Create Account</Text>
          </KeyboardAvoidingView>
      </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 40,
  },
  input: {
    marginTop: 10,
    height: 40,
    paddingLeft: 15,
    fontSize: 16,
    color: "#fff",
    width: DEVICE_WIDTH - 40,
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
