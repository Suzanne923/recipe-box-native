import axios from 'axios';
import {
  NAVIGATION_CHANGE,
  NAVIGATION_BACK,
  LOADING,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_RECIPES,
  FETCH_RECIPE,
  SEARCH_RECIPES,
  RESET_SEARCH,
  LOADING_FONT
} from './types';

const ROOT_URL = "https://calm-falls-74034.herokuapp.com";

export function navigate(screen, prop) {
  const navProp = prop !== '' ? prop : '';
  return {
    type: NAVIGATION_CHANGE,
    payload: screen,
    navProp
  }
}

export const navigateBack = () => ({
  type: NAVIGATION_BACK
});

export function signinUser({ email, password }) {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    });
    try {
      const response = await axios.post(`${ROOT_URL}/signin`, { email, password });
      dispatch({
        type: AUTH_USER,
        email,
        token: response.data.token
      });
    } catch(e) {
      console.log(e);
      dispatch(authError('Bad Login Info'));
    }
  }
}

export function signupUser({ email, password }, callback) {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    });
    try {
      const response = await axios.post(`${ROOT_URL}/signup`, { email, password });
      dispatch({
        type: AUTH_USER,
        email,
        token: response.data.token
      });
      callback();
    } catch(e) {
      console.log(e);
      dispatch(authError('Bad Login Info'));
    }
  }
}

export function logoutUser() {
  return { type: UNAUTH_USER };
}

export function authError(error) {
  console.log(error);
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function fetchRecipes() {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    });
    try {
      const response = await axios.get(`${ROOT_URL}/recipes`);
      dispatch({
        type: FETCH_RECIPES,
        payload: response.data
      });
    } catch(e) {
      console.log(e);
    }
  }
}

export function fetchRecipe(id) {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    });
    try {
      const response = await axios.get(`${ROOT_URL}/recipes/${id}`);
      dispatch({
        type: FETCH_RECIPE,
        payload: response.data
      });
    } catch(e) {
      console.log(e);
    }
  }
}

export function searchRecipes(query) {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    });
    try {
      const response = await axios.post(`${ROOT_URL}/search`, { query });
      return dispatch({
        type: SEARCH_RECIPES,
        payload: response.data
      });
    } catch(e) {
      console.log(e);
    }
  }
}

export function resetSearch() {
  return {
    type: RESET_SEARCH
  };
}

// function recipesError();
