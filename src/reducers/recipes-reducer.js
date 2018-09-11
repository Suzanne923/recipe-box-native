import {
  LOADING,
  FETCH_RECIPES,
  FETCH_RECIPE,
  SEARCH_RECIPES,
  RESET_SEARCH
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
  error: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
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
    default:
      return state;
  }
}
