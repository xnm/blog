/* Created by Aquariuslt on 4/29/17.*/
import _ from 'lodash';

import * as types from './mutation-types';
import blogApi from '../api/blog.api';

export default {
  [types.LOAD_INDEXES]({commit, getters}){
    if (_.isEmpty(getters.indexes)) {
      blogApi.getIndexes()
        .then((res) => {
          commit(types.LOAD_INDEXES, res.data);
        });
    }
  },
  [types.LOAD_POST]({commit, state}, filename){
    if (_.isUndefined(_.find(state.postList, {filename: filename}))) {
      blogApi.getPostData(filename)
        .then((res) => {
          let post = res.data;
          post.filename = filename;
          commit(types.LOAD_POST, {post});
          commit(types.UPDATE_CURRENT_POST, filename);
        });
    }
    else {
      commit(types.UPDATE_CURRENT_POST, filename);
    }
  }
};
