import {createStore} from 'redux';
import createReducer from './reducers';

function configureStore() {
  return createStore(createReducer(), {});
}

export default configureStore;
