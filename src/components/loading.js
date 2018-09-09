import React from 'react';
import { StyleSheet, Image } from 'react-native';

import spinner from '../images/spinner2.gif';

const Loading = () => (
  <Image source={spinner} style={styles.image} />
);

export default Loading;

const styles = StyleSheet.create({
  image: {
    marginTop: 50,
    width: 60,
    height: 60,
  }
});
