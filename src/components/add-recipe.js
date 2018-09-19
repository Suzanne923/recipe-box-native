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
          ingredient: ''
        }]
    });
  }

  focusNextField(id) {
    this.inputs[id].focus();
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
    const { image } = this.state;
    let { title, tags, ingredients, instructions } = this.state;
    title = title.charAt(0).toUpperCase() + title.substr(1);
    tags = tags.split(', ').map(item => item.charAt(0).toLowerCase() + item.substr(1));
    instructions = instructions.split(/[\n\r]/g).map(item => item.charAt(0).toUpperCase() + item.substr(1));
    ingredients = ingredients.map((ingredient) => {
      ingredient.measure = ingredient.measure.charAt(0).toLowerCase() + ingredient.measure.substr(1);
      delete ingredient.key;
      return ingredient;
    });
    const newRecipe = { image_url: image, title, tags, ingredients, instructions };
    const formData = new FormData();

    Object.keys(newRecipe).forEach((item) => {
      if (item === "image_url" && !newRecipe[item].path) {
        return Alert.alert(`Add a recipe image!`);
      }
      if (item !== "image_url" && (!newRecipe[item] || !newRecipe[item].length)) {
        return Alert.alert(`${item} is empty!`);
      }
    });

    image.type = 'image/jpeg';
    formData.append('recipe-image', image);
    newRecipe.image_url = formData;

    console.log(newRecipe);
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
          value={ingredient.ingredient}
          inputStyle={[styles.textInput, { width: (DEVICE_WIDTH / 15) * 9, marginRight: 1, marginTop: 0 }]}
          placeholder="Ingredient"
          onChangeText={this.handleIngredientInputChange(i, 'ingredient')}
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

export default AddRecipe;

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
