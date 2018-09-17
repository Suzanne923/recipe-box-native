import React from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Alert } from 'react-native';
import FormData from 'form-data';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
  }

  addIngredientInput = () => {
    const { ingredients } = this.state;

    this.setState({ ingredients: [...ingredients, { amount: '', measure: '', ingredient: '' }] });
  }

  setImage = image => this.setState({ image });

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
    const { image, title, tags, ingredients, instructions } = this.state;
    const newRecipe = { title, tags, ingredients, instructions };
    const formData = new FormData();

    image.type = 'image/jpeg';
    formData.append('recipe-image', image);
    newRecipe.image = formData;

    Object.keys(newRecipe).forEach((item) => {
      if (!newRecipe[item] || !newRecipe[item].length) {
        return Alert.alert(`${item} is empty!`);
      }
    });

    console.log(newRecipe);
  }

  renderInput = (value, style, placeholder, property, multiline = false) => (
    <Input
      value={value}
      inputStyle={style}
      placeholder={placeholder}
      multiline={multiline}
      onChangeText={this.handleInputChange(property)}
      placeholderTextColor="#666666"
    />
  )

  renderIngredientInputs = () => {
    const { ingredients } = this.state;

    return ingredients.map((ingredient, i) => (
      <View key={ingredientCounter++} style={{ flexDirection: "row" }}>
        <Input
          value={ingredient.amount}
          inputStyle={[styles.textInput, { width: (DEVICE_WIDTH / 15) * 2, marginRight: 1 }]}
          placeholder="#"
          keyboardType="numeric"
          onChangeText={this.handleIngredientInputChange(i, 'amount')}
          placeholderTextColor="#666666"
        />
        <Input
          value={ingredient.measure}
          inputStyle={[styles.textInput, { width: (DEVICE_WIDTH / 15) * 3, marginLeft: 1, marginRight: 1 }]}
          placeholder="Measure"
          onChangeText={this.handleIngredientInputChange(i, 'measure')}
          placeholderTextColor="#666666"
        />
        <Input
          value={ingredient.ingredient}
          inputStyle={[styles.textInput, { width: (DEVICE_WIDTH / 15) * 9, marginLeft: 1, marginRight: 1 }]}
          placeholder="Ingredient"
          onChangeText={this.handleIngredientInputChange(i, 'ingredient')}
          placeholderTextColor="#666666"
        />
        <TouchableOpacity style={[styles.button, { width: DEVICE_WIDTH / 15 }]}>
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
        {this.renderInput(title, styles.textInput, "Enter a title for your recipe", "title")}
        {this.renderInput(tags, styles.textInput, "Separate your tags with a comma", "tags")}
        <View>
          {this.renderIngredientInputs()}
        </View>
        <TouchableOpacity
          style={[styles.button, { flexDirection: "row" }]}
          onPress={() => { this.addIngredientInput(ingredients.length); }}
        >
          <FontAwesome name="plus" size={16} color="white" />
          <Text style={styles.buttonText}>Add Ingredient</Text>
        </TouchableOpacity>
        {this.renderInput(
          instructions,
          styles.ingredientsInput,
          "Write each instruction on a new line",
          "instructions",
          true
        )}
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Submit Recipe</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AddRecipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: (DEVICE_WIDTH) - 4,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    padding: 5,
    color: "#333",
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold",
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    backgroundColor: "white",
    alignSelf: "stretch",
    textAlign: "center"
  },
  text: {
    fontSize: 16,
    fontFamily: "OpenSans-Regular"
  },
  textInput: {
    marginTop: 10,
    height: 40,
    width: DEVICE_WIDTH,
    paddingLeft: 10,
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    backgroundColor: "white",
    color: "#333"
  },
  ingredientsInput: {
    marginTop: 10,
    width: DEVICE_WIDTH,
    paddingLeft: 10,
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    backgroundColor: "white",
    color: "#333",
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    padding: 5,
    marginTop: 10,
    backgroundColor: "#a92b00",
    alignItems: "center"
  },
  buttonText: {
    marginLeft: 5,
    color: "white",
    fontSize: 16,
    fontFamily: "OpenSans-Regular"
  }
});
