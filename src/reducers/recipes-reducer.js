import {
  LOADING,
  FETCH_RECIPES,
  FETCH_RECIPE,
  SEARCH_RECIPES,
  RESET_SEARCH
} from '../actions/types';

export const initialState: IRecipeState = {
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
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case FETCH_RECIPES:
      return { ...state, isLoading: false, newFetch: false, storedRecipes: action.payload, error: '' };
    case FETCH_RECIPE:
      return { ...state, isLoading: false, selectedRecipe: action.payload, error: '' };
    case SEARCH_RECIPES:
      return { ...state, isLoading: false, searchResults: action.payload, error: '' };
    case RESET_SEARCH:
      return { ...state, isLoading: false, searchResults: [], error: '' };
    /*case ADD_RECIPE:
      return { ...state, isLoading: false, storedRecipes: state.storedRecipes.push(action.payload), error: '' };
    case RECIPES_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case DESELECT_RECIPE:
      return { ...state, selectedRecipe: initialState.selectedRecipe }
    case DELETE_RECIPE:
      return { ...state, storedRecipes: state.storedRecipes.filter(recipe => recipe.id !== action.payload.id), selectedRecipe: initialState.selectedRecipe, error: '' }*/
    default:
      return state;
  }
}
