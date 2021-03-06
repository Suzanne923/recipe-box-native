import axios from 'axios';
import { AsyncStorage } from "react-native";
import {
  NAVIGATION_CHANGE,
  NAVIGATION_BACK,
  LOADING,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  RESET_AUTH_ERROR,
  FETCH_RECIPES,
  FETCH_RECIPE,
  SEARCH_RECIPES,
  RESET_SEARCH,
  IMAGE_SUBMITTED,
  DONE,
  LIKE_RECIPE,
  FETCH_LIKED_RECIPES
} from './types';

const ROOT_URL = "http://ec2-54-165-226-10.compute-1.amazonaws.com:8080";

export function navigate(screen, prop) {
  const navProp = prop !== '' ? prop : '';
  return {
    type: NAVIGATION_CHANGE,
    payload: screen,
    navProp
  };
}

export const navigateBack = () => ({ type: NAVIGATION_BACK });

export function signinUser({ email, password }, callback) {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const response = await axios.post(`${ROOT_URL}/signin`, { email, password });
      const { id, token } = response.data;
      dispatch({
        type: AUTH_USER,
        email,
        id,
        token
      });
      await AsyncStorage.setItem('recipeToken', token);
      callback();
    } catch (e) {
      console.log(e);
      dispatch(authError('Bad Login Info'));
    }
  };
}

export function signupUser({ email, password }, callback) {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const response = await axios.post(`${ROOT_URL}/signup`, { email, password });
      const token = response.data.token;
      dispatch({
        type: AUTH_USER,
        email,
        token
      });
      await AsyncStorage.setItem('recipeToken', token);
      callback();
    } catch (e) {
      console.log(e);
      dispatch(authError('Bad Login Info'));
    }
  };
}

export function fetchUser(token, callback) {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const response = await axios.get(`${ROOT_URL}/authenticate`, { headers: { authorization: token } });
      const { id, email } = response.data;
      dispatch({
        type: AUTH_USER,
        email,
        id,
        token
      });
      callback();
    } catch (e) {
      console.log(e);
    }
  };
}

export function signoutUser(callback) {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem('recipeToken');
      dispatch({ type: UNAUTH_USER });
      callback();
    } catch (e) {
      console.log(e);
    }
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export const resetAuthError = () => ({ type: RESET_AUTH_ERROR });

export function fetchRecipes() {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const response = await axios.get(`${ROOT_URL}/recipes`);
      dispatch({
        type: FETCH_RECIPES,
        payload: response.data
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function fetchRecipe(id) {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const response = await axios.get(`${ROOT_URL}/recipes/${id}`);
      dispatch({
        type: FETCH_RECIPE,
        payload: response.data
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function searchRecipes(query) {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const response = await axios.post(`${ROOT_URL}/search`, { query });
      return dispatch({
        type: SEARCH_RECIPES,
        payload: response.data
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function resetSearch() {
  return { type: RESET_SEARCH };
}


export function uploadImage(formData, callback) {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const response = await axios.post(`${ROOT_URL}/upload`, formData);
      const imageUrl = `${ROOT_URL}/public/${response.data.file.filename}`;
      dispatch({
        type: IMAGE_SUBMITTED,
        payload: imageUrl
      });
      callback(imageUrl);
    } catch (e) {
      console.log(e);
    }
  };
}

export function addRecipe(recipeData, callback) {
  return async (dispatch) => {
    try {
      await axios.post(`${ROOT_URL}/recipes`, { data: recipeData });
      dispatch({ type: DONE });
      callback();
    } catch (e) {
      console.log(e);
    }
  };
}

export function likeRecipe(recipeId, userId) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${ROOT_URL}/like`, { recipeId, userId });
      dispatch({
        type: LIKE_RECIPE,
        id: recipeId,
        payload: response.data.liked
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function fetchLikedRecipes() {
  return async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      const response = await axios.get(`${ROOT_URL}/liked`);
      dispatch({
        type: FETCH_LIKED_RECIPES,
        payload: response.data.map(item => item.recipe_id)
      });
    } catch (e) {
      console.log(e);
    }
  };
}

// function recipesError();
