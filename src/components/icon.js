import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

const Icon = ({
  style,
  onPress,
  children
}) => (
  <TouchableOpacity style={style} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

Icon.propTypes = {
  style: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Icon;
