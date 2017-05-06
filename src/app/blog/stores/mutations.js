/* Created by Aquariuslt on 4/29/17.*/
import _ from 'lodash';
import * as types from './mutation-types';
export default {
  [types.LOAD_INDEXES](state, indexes){
    state.indexes = indexes;
  },
  [types.LOAD_POST](state, {post}){
    state.postList.push(post);
  },
  [types.UPDATE_CURRENT_POST](state, filename){
    state.currentPost = _.find(state.postList, {filename: filename});
    document.title = state.currentPost.metadata.title + ' | ' + document.title;
  }
};
