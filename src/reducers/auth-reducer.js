import {
  LOADING,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  RESET_AUTH_ERROR
} from '../actions/types';

const initialState = {
  isLoading: false,
  authenticated: false,
  email: '',
  token: '',
  error: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case AUTH_USER:
      return {
        ...state,
        isLoading: false,
        authenticated:
        true,
        error: '',
        email: action.email,
        token: action.token
      };
    case UNAUTH_USER:
      return {
        ...state,
        isLoading:
        false,
        authenticated:
        false,
        email: '',
        token: ''
      };
    case AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case RESET_AUTH_ERROR:
      return { ...state, error: '' };
    default:
      return state;
  }
}
