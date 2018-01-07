import * as types from './mutation-types';

export default {
  [types.LOAD_APP_CONFIG](state, config) {
    state.config = config;
  }
};
