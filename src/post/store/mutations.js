import * as types from './mutation-types';

export default {
  [types.LOAD_POSTS_INDEXES](state, indexes) {
    state.indexes = indexes;
  }
}
;
