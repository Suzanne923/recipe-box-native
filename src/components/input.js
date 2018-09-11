import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput } from 'react-native';

const Input = (props) => {
  const {
    inputStyle,
    placeholder,
    onChangeText,
    secureTextEntry,
    autoCorrect,
    autoCapitalize,
    returnKeyType
  } = props;

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={inputStyle}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        returnKeyType={returnKeyType}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

Input.propTypes = {
  inputStyle: PropTypes.any.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool.isRequired,
  autoCorrect: PropTypes.bool.isRequired,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string
};

Input.defaultProps = {
  autoCapitalize: "none",
  returnKeyType: "done"
};

export default Input;

const styles = StyleSheet.create({ inputWrapper: { flex: 1 } });
