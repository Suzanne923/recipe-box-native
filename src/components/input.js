import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput } from 'react-native';

class Input extends React.Component {
  render() {
    const {
      inputStyle,
      placeholder,
      onChangeText,
      secureTextEntry,
      autoCorrect,
      autoCapitalize,
      onSubmitEditing,
      returnKeyType,
      blurOnSubmit,
      getRef
    } = this.props;

    return (
      <View style={styles.inputWrapper}>
        <TextInput
          style={inputStyle}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          blurOnSubmit={blurOnSubmit}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          ref={getRef}
        />
      </View>
    );
  }
}

Input.propTypes = {
  inputStyle: PropTypes.any.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  onSubmitEditing: PropTypes.any,
  returnKeyType: PropTypes.string,
  blurOnSubmit: PropTypes.bool,
  getRef: PropTypes.func
};

Input.defaultProps = {
  secureTextEntry: false,
  autoCorrect: false,
  autoCapitalize: "none",
  onSubmitEditing: null,
  returnKeyType: "done",
  blurOnSubmit: false,
  getRef: null
};

export default Input;

const styles = StyleSheet.create({ inputWrapper: { flex: 1 } });
