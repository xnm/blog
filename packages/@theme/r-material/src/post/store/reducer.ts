import {PostActionTypes} from './action-types';




const initialState = {};

export default function postReducer(state = initialState, action: PostActionTypes) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
