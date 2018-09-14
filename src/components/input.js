import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';

class Input extends React.Component {
  render() {
    const {
      value,
      inputStyle,
      placeholder,
      onChangeText,
      secureTextEntry,
      autoCorrect,
      autoCapitalize,
      onSubmitEditing,
      returnKeyType,
      blurOnSubmit,
      placeholderTextColor,
      underlineColorAndroid,
      getRef
    } = this.props;

    return (
      <View>
        <TextInput
          value={value}
          style={inputStyle}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          blurOnSubmit={blurOnSubmit}
          placeholderTextColor={placeholderTextColor}
          underlineColorAndroid={underlineColorAndroid}
          ref={getRef}
        />
      </View>
    );
  }
}

Input.propTypes = {
  value: PropTypes.string,
  inputStyle: PropTypes.any.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  onSubmitEditing: PropTypes.any,
  returnKeyType: PropTypes.string,
  blurOnSubmit: PropTypes.bool,
  placeholderTextColor: PropTypes.string,
  underlineColorAndroid: PropTypes.string,
  getRef: PropTypes.func
};

Input.defaultProps = {
  value: '',
  secureTextEntry: false,
  autoCorrect: false,
  autoCapitalize: "none",
  onSubmitEditing: null,
  returnKeyType: "done",
  blurOnSubmit: false,
  placeholderTextColor: "white",
  underlineColorAndroid: "transparent",
  getRef: null
};

export default Input;
