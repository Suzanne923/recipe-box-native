import React from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';

const Input = (props) => {
  const { inputStyle, placeholder, onChangeText, secureTextEntry, autoCorrect, autoCapitalize, returnKeyType } = props;

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
}

export default Input;

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1
  }
});
