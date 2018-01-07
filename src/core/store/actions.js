import coreApi from '../api/core.api';
import * as types from './mutation-types';

export default {
  [types.LOAD_APP_CONFIG]({commit}) {
    coreApi.getApplicationConfig().then((res) => {
      commit(types.LOAD_APP_CONFIG, res.data);
    });
  }
};
