import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ErrorMessage = (props) => {
  const { errorMessage } = props;
  const error = Object.keys(errorMessage).map(item => errorMessage[item]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error[0]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  text: {
    marginTop: 2,
    color: "red",
    fontSize: 14
  }
});

export default ErrorMessage;
