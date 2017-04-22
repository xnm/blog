/* Created by Aquariuslt on 22/04/2017.*/
import * as types from './mutation-types';
import blogApi from '../../api/blog';
export default {
  [types.LOAD_APPLICATION_PROPERTIES]({commit}) {
    blogApi.getApplicationProperties((res) => {
      commit(types.LOAD_APPLICATION_PROPERTIES, res);
    });
  }
};
