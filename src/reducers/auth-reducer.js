import {
  LOADING,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_USER
} from '../actions/types';

const initialState = {
  isLoading: false,
  authenticated: false,
  email: '',
  token: '',
  error: ''
}

export default function(state = initialState, action) {
  switch(action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case AUTH_USER:
      return { ...state, isLoading: false, authenticated: true, error: '', email: action.email, token: action.token };
    case UNAUTH_USER:
      return { ...state, isLoading: false, authenticated: false, email: '', token: '' };
    case AUTH_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case FETCH_USER:
      return { ...state, error: '', username: action.username, base64: action.base64, authenticated: true };
    default:
      return state;
  }
}
