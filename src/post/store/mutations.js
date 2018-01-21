import * as types from './mutation-types';
import _ from 'lodash';

export default {
  [types.LOAD_POSTS_INDEXES](state, indexes) {
    state.indexes = indexes;
  },
  [types.UPDATE_POSTS_FILTER](state, filter) {
    if (_.isEmpty(filter)) {
      state.filter = {};
    }
    else {
      state.filter = filter;
    }
  }
}
;
