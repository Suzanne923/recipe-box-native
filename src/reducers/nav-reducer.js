import screens from '../screens';
import {
  NAVIGATION_CHANGE,
  NAVIGATION_BACK
} from '../actions/types';

const initialState = {
  screen: screens.DEFAULT,
  history: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case NAVIGATION_CHANGE:
      newHistory = [ ...state.history, state.screen];
      return { ...state, history: newHistory, screen: action.payload, navProp: action.navProp };
    case NAVIGATION_BACK:
      return { ...state, screen: state.history[state.history.length - 1], history: state.history.slice(0, -1) };
    default:
      return state;
  }
}
