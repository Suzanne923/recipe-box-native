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
      return { ...state, history: [...state.history, state.screen], screen: action.payload, navProp: action.navProp };
    case NAVIGATION_BACK:
      const lastScreen = state.history[state.history.length - 1];
      return { ...state, screen: state.history.pop(), history: state.history.slice(0, -1) };
    default:
      return state;
  }
}
