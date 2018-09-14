import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

const MenuButton = ({ onPress, children }) => (
  <TouchableOpacity
    underlayColor="rgba(255, 255, 255, 0.2)"
    onPress={onPress}
    style={{ marginLeft: 20, marginRight: 20 }}
  >
    {children}
  </TouchableOpacity>
);

MenuButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default MenuButton;
