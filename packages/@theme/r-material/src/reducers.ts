import { combineReducers, Reducer } from 'redux';

let reducerMap = {};

function registerReducer(reducerKey: string, reducer: Reducer): void {
  reducerMap[reducerKey] = reducer;
}

function attachReducer(): Reducer {
  return combineReducers(reducerMap);
}


export { registerReducer, attachReducer };
