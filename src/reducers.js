import {fromJS} from 'immutable';
import {combineReducers} from 'redux';

const routeInitialState = fromJS({
  location: null
});

function routeReducer(state = routeInitialState) {
  return state;
}

export default function reducers(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    ...injectedReducers
  });
}
