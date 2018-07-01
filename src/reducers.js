import {combineReducers} from 'redux';

const initialState = {
  appConfig: {}
};

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  counter: counterReducer
});

export default rootReducer;
