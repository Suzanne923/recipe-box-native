import React from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, Button } from 'react-native';
import Dimensions from 'Dimensions';
import screens from '../../screens';

import Logo from '../logo';
import Input from '../input';
import Submitbutton from './submit-button';
import ErrorMessage from './error-message';

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      error: ''
    }
  }

  handleInputChange = (property) => (value) => {
    this.setState({ [property]: value });
  }

  validate = () => {
    const { email, password, passwordConfirm } = this.state;

    ["email", "password", "passwordConfirm"].forEach(item => {
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
    const { isLoading } = this.props;
    const { email, password } = this.state;

    onSubmit({ email, password }, () => { onNavigate(screens.HOME) });
  }

  render() {
    const { isLoading } = this.props;
    const { error } = this.state;

    return (
      <View>
        <Logo />
        <Text style={styles.title}>SIGN UP</Text>
        <KeyboardAvoidingView>
          <Input
            inputStyle={styles.input}
            placeholder="Email"
            secureTextEntry={false}
            onChangeText={this.handleInputChange('email')}
            autoCorrect={false}
            autoCapitalize={'none'}
            returnKeyType={'done'}
          />
          { error.passwordConfirm ? <ErrorMessage errorMessage={error} /> : null }
          <Input
            inputStyle={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={this.handleInputChange('password')}
            autoCorrect={false}
            autoCapitalize={'none'}
            returnKeyType={'done'}
          />
          { error.passwordConfirm ? <ErrorMessage errorMessage={error} /> : null }
          <Input
            inputStyle={styles.input}
            placeholder="Confirm password"
            secureTextEntry={true}
            onChangeText={this.handleInputChange('passwordConfirm')}
            autoCorrect={false}
            autoCapitalize={'none'}
            returnKeyType={'done'}
          />
        { error.passwordConfirm ? <ErrorMessage errorMessage={error} /> : null }
          <Submitbutton
            isLoading={isLoading}
            handleSubmit={this.handleSubmit}
            validate={this.validate}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
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
