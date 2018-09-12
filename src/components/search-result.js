import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

const SearchResult = ({
  i,
  title,
  tags,
  ingredients
}) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      <Text style={[styles.text, { fontFamily: "OpenSans-Bold" }]}>{`${i + 1}. ${title} `}</Text>
      <Text>
        {tags}
        {ingredients}
      </Text>
    </Text>
  </View>
);

SearchResult.propTypes = {
  i: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.string,
  ingredients: PropTypes.string
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
