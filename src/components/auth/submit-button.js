import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, View, TouchableHighlight, Text, Animated, Easing, Image } from 'react-native';

import spinner from '../../images/spinner.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

export default class SubmitButton extends React.Component {
  constructor() {
    super();

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
  }

  onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear
    }).start();
  }

  handlePress = () => {
    const { onSubmit, validate } = this.props;
    const validated = validate();

    if (validated) {
      Animated.timing(this.buttonAnimated, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear
      }).start();

      setTimeout(() => {
        onSubmit();
      }, 10);

      setTimeout(() => {
        this.onGrow();
      }, 2000);

      setTimeout(() => {
        this.buttonAnimated.setValue(0);
        this.growAnimated.setValue(0);
      }, 40000);
    }
  }

  render() {
    const { isLoading } = this.props;
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN]
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{ width: changeWidth }}>
          <TouchableHighlight
            onPress={this.handlePress}
            underlayColor="#d85050"
            style={styles.button}
          >
            { isLoading ? <Image source={spinner} style={styles.image} /> : <Text style={styles.text}>Submit</Text> }
          </TouchableHighlight>
          <Animated.View style={[styles.circle, { transform: [{ scale: changeScale }] }]} />
        </Animated.View>
      </View>
    );
  }
}

SubmitButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d84242',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: 'rgba(255, 255, 255, 0)'
  },
  text: {
    fontSize: 16,
    color: "white",
    fontFamily: "OpenSans-Regular"
  },
  image: {
    width: 30,
    height: 30
  }
});
