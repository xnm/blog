import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { attachReducer } from './reducers';

function configureStore(preloadedState?): Store {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const composeEnhancers = compose(middlewareEnhancer);

  const rootReducer = attachReducer();

  return createStore(rootReducer, preloadedState, composeEnhancers);
}
const store = configureStore();

export default store;
