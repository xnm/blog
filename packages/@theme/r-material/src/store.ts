import { applyMiddleware, compose, createStore, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { attachReducer } from './reducers';


export default function configureStore(preloadedState?): Store {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const composeEnhancers = compose(middlewareEnhancer);

  const rootReducer = attachReducer();

  return createStore(rootReducer, preloadedState, composeEnhancers);
}
