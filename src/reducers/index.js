import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import navReducer from './nav-reducer';
import recipesReducer from './recipes-reducer';

const AppReducer = combineReducers({
  nav: navReducer,
  auth: authReducer,
  recipes: recipesReducer
});

export default AppReducer;
