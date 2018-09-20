import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Alert } from 'react-native';
import FormData from 'form-data';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import screens from '../screens';
import * as actions from '../actions';
import ImagePicker from './image-picker';
import Input from './input';

let ingredientCounter = 0;
const DEVICE_WIDTH = Dimensions.get('window').width;

class AddRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      image: {},
      title: '',
      tags: '',
      ingredients: [],
      instructions: ''
    };

    this.inputs = {};
  }

  addIngredientInput = () => {
    const { ingredients } = this.state;

    this.setState({
      ingredients:
        [...ingredients, {
          key: ingredientCounter++,
          amount: '',
          measure: '',
          name: ''
        }]
    });
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  validateSubmit = (recipeData) => {
    let validated = true;
    Object.keys(recipeData).forEach((item) => {
      if (item === "image_url" && !recipeData[item].path) {
        Alert.alert(`Add a recipe image!`);
        validated = false;
      }
      if (item === "ingredients") {
        recipeData[item].forEach((ingredient) => {
          if (!ingredient.amount || !ingredient.measure || !ingredient.name) {
            Alert.alert(`Give an amount, measure and name for each ingredient!`);
            validated = false;
          }
        });
      }
      if (item !== "image_url" && (!recipeData[item] || !recipeData[item].length)) {
        Alert.alert(`${item} is empty!`);
        validated = false;
      }
    });

    return validated;
  }

  setImage = image => this.setState({ image });

  handleDeleteIngredient = (key) => {
    const { ingredients } = this.state;

    this.setState({ ingredients: ingredients.filter(item => item.key !== key) });
  }

  handleInputChange = property => (value) => {
    this.setState({ [property]: value });
  }

  handleIngredientInputChange = (index, property) => (value) => {
    const { ingredients } = this.state;

    if (property === "amount") {
      const numbers = "0123456789.";

      for (let i = 0; i < value.length; i++) {
        if (numbers.indexOf(value[i]) === -1) {
          return Alert.alert("Please enter numbers only");
        }
      }
    }

    this.setState({
      ingredients: ingredients.map((ingredient, i) => {
        if (i === index) {
          ingredient[property] = value.toString();
        }
        return ingredient;
      })
    });
  }

  handleSubmit = () => {
    const { uploadImage, addRecipe, navigate } = this.props;
    const { image, title, tags, ingredients, instructions } = this.state;
    const newRecipe = { image_url: image, title, tags, ingredients, instructions };

    if (this.validateSubmit(newRecipe)) {
      newRecipe.title = title.charAt(0).toUpperCase() + title.substr(1);
      newRecipe.tags = tags.split(', ').map(item => item.charAt(0).toLowerCase() + item.substr(1));
      newRecipe.instructions = instructions.split(/[\n\r]/g).map(item => item.charAt(0).toUpperCase() + item.substr(1));
      newRecipe.ingredients = ingredients.map((ingredient) => {
        ingredient.measure = ingredient.measure.charAt(0).toLowerCase() + ingredient.measure.substr(1);
        delete ingredient.key;
        return ingredient;
      });
      const formData = new FormData();

      image.type = 'image/jpeg';
      formData.append('recipe-image', image);
      newRecipe.image_url = formData;

      uploadImage(formData, (imageUrl) => {
        newRecipe.image_url = imageUrl;
        addRecipe(newRecipe, () => navigate(screens.HOME));
      });
    }
  }

  renderInput = (value, style, placeholder, property, multiline = false) => (
    <Input
      value={value}
      inputStyle={style}
      placeholder={placeholder}
      multiline={multiline}
      onChangeText={this.handleInputChange(property)}
      placeholderTextColor="#555"
      underlineColorAndroid="#a92b00"
    />
  )

  renderIngredientInputs = () => {
    const { ingredients } = this.state;

    return ingredients.map((ingredient, i) => (
      <View key={ingredient.key} style={styles.ingredientsContainer}>
        <Input
          value={ingredient.amount}
          inputStyle={[styles.textInput, { width: (DEVICE_WIDTH / 15) * 2, marginRight: 1, marginTop: 0 }]}
          placeholder="#"
          onSubmitEditing={() => { this.focusNextField((i * 3) + 2); }}
          returnKeyType="next"
          keyboardType="numeric"
          onChangeText={this.handleIngredientInputChange(i, 'amount')}
          placeholderTextColor="#666666"
        />
        <Input
          value={ingredient.measure}
          inputStyle={[styles.textInput, { width: (DEVICE_WIDTH / 15) * 3, marginRight: 1, marginTop: 0 }]}
          placeholder="Measure"
          onSubmitEditing={() => { this.focusNextField((i * 3) + 3); }}
          returnKeyType="next"
          onChangeText={this.handleIngredientInputChange(i, 'measure')}
          placeholderTextColor="#666666"
          getRef={(input) => { this.inputs[(i * 3) + 2] = input; }}
        />
        <Input
          value={ingredient.name}
          inputStyle={[styles.textInput, { width: (DEVICE_WIDTH / 15) * 9, marginRight: 1, marginTop: 0 }]}
          placeholder="Ingredient"
          onChangeText={this.handleIngredientInputChange(i, 'name')}
          placeholderTextColor="#666666"
          getRef={(input) => { this.inputs[(i * 3) + 3] = input; }}
        />
        <TouchableOpacity
          style={[styles.button, { width: DEVICE_WIDTH / 15, marginTop: 0, borderRadius: 0 }]}
          onPress={() => {
            Alert.alert('', 'Delete ingredient?', [
              { text: "Yes", onPress: () => this.handleDeleteIngredient(ingredient.key) },
              { text: "No", onPress: () => null }
            ]);
          }}
        >
          <FontAwesome name="minus" size={16} color="white" />
        </TouchableOpacity>
      </View>
    ));
  }

  render() {
    const { title, tags, ingredients, instructions } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add a Recipe</Text>
        <ImagePicker setImage={this.setImage} maxHeight={300} maxWidth={300} />
        {this.renderInput(
          title,
          [styles.textInput, { height: 50 }],
          "Enter a title for your recipe",
          "title",
        )}
        {this.renderInput(
          tags,
          [styles.textInput, { height: 50 }],
          "Separate your tags with a comma",
          "tags",
        )}
        {this.renderIngredientInputs()}
        <TouchableOpacity
          style={[styles.button, { flexDirection: "row" }]}
          onPress={() => { this.addIngredientInput(ingredients.length); }}
          activeOpacity={0.5}
        >
          <FontAwesome name="plus" size={16} color="white" />
          <Text style={styles.buttonText}>Add Ingredient</Text>
        </TouchableOpacity>
        {this.renderInput(
          instructions,
          [styles.textInput, { marginLeft: 10, marginRight: 10 }],
          "Write each instruction on a new line",
          "instructions",
          true
        )}
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit} activeOpacity={0.5}>
          <Text style={styles.buttonText}>Submit Recipe</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

AddRecipe.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  addRecipe: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
};

export default connect(null, actions)(AddRecipe);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: (DEVICE_WIDTH) - 4,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee"
  },
  title: {
    padding: 5,
    color: "#333",
    fontSize: 20,
    fontFamily: "OpenSans-SemiBold",
    alignSelf: "stretch",
    textAlign: "center"
  },
  text: {
    fontSize: 16,
    fontFamily: "OpenSans-Regular"
  },
  textInput: {
    marginTop: 10,
    width: DEVICE_WIDTH,
    paddingLeft: 10,
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    backgroundColor: "#fff",
    color: "#333"
  },
  ingredientsContainer: {
    flexDirection: "row",
    marginTop: 10
  },
  button: {
    padding: 5,
    marginTop: 10,
    backgroundColor: "#a92b00",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  buttonText: {
    marginLeft: 3,
    color: "white",
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold"
  }
});
