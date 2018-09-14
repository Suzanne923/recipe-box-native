import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const SearchResult = ({
  i,
  id,
  title,
  tags,
  ingredients,
  onPress
}) => (
  <View>
    <TouchableOpacity onPress={() => onPress(id)} underlayColor="rgba(255, 255, 255, 0.2)">
      <View style={styles.container}>
        <Text style={styles.text}>
          <Text style={[styles.text, { fontFamily: "OpenSans-Bold" }]}>{`${i + 1}. ${title} `}</Text>
          <Text>
            {tags}
            {ingredients}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

SearchResult.propTypes = {
  i: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.string,
  ingredients: PropTypes.string,
  onPress: PropTypes.func.isRequired
};

SearchResult.defaultProps = {
  tags: '',
  ingredients: ''
};

export default SearchResult;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    padding: 10
  },
  text: {
    color: "#333",
    fontFamily: "OpenSans-Regular",
    fontSize: 18,
    backgroundColor: "white"
  }
});
