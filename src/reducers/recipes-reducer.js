import {
  LOADING,
  FETCH_RECIPES,
  FETCH_RECIPE,
  SEARCH_RECIPES,
  RESET_SEARCH,
  IMAGE_SUBMITTED,
  DONE,
  LIKE_RECIPE,
  FETCH_LIKED_RECIPES
} from '../actions/types';

export const initialState = {
  newFetch: true,
  isLoading: false,
  storedRecipes: [],
  selectedRecipe: {
    id: 0,
    title: '',
    tags: [],
    ingredients: [],
    instructions: [],
    image_url: null
  },
  searchResults: [],
  error: '',
  likedRecipes: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case DONE:
      return { ...state, isLoading: false };
    case FETCH_RECIPES:
      return {
        ...state,
        isLoading: false,
        newFetch: false,
        storedRecipes: action.payload,
        error: ''
      };
    case FETCH_RECIPE:
      return {
        ...state,
        isLoading: false,
        selectedRecipe: action.payload,
        error: ''
      };
    case SEARCH_RECIPES:
      return {
        ...state,
        isLoading: false,
        searchResults: action.payload,
        error: ''
      };
    case RESET_SEARCH:
      return {
        ...state,
        isLoading: false,
        searchResults: [],
        error: ''
      };
    case IMAGE_SUBMITTED:
      return {
        ...state,
        recipeImage: action.payload
      };
    case LIKE_RECIPE: {
      const likedRecipes = (action.payload === 1
        ? [...state.likedRecipes, action.id]
        : state.likedRecipes.filter(id => id !== action.id));
      return { ...state, likedRecipes };
    }
    case FETCH_LIKED_RECIPES:
      return { ...state, likedRecipes: action.payload };
    default:
      return state;
  }
}
