import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, Button } from 'react-native';
import Dimensions from 'Dimensions';
import screens from '../../screens';
import * as actions from '../../actions';

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
    const { isLoading, signupUser, navigate } = this.props;
    const { email, password } = this.state;

    signupUser({ email, password }, () => { navigate(screens.HOME) });
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

const mapStateToProps = (state) => ({ isLoading: state.auth.isLoading });

export default connect(mapStateToProps, actions)(Signup);

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontFamily: "OpenSans-Bold",
    color: "white",
    textAlign: "center",
    marginTop: 40,
  },
  input: {
    marginTop: 10,
    height: 40,
    paddingLeft: 15,
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
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
