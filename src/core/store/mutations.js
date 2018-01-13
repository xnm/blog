import _ from 'lodash';
import * as types from './mutation-types';

export default {
  [types.LOAD_APP_CONFIG](state, config) {
    state.config = config;
  },
  [types.REGISTER_NAV_MENUS](state, registerMenus) {
    let menus = state.menus;
    menus = _.sortBy(menus.concat(registerMenus), 'priority');
    state.menus = menus;
  }
};
