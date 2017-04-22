/* Created by Aquariuslt on 22/04/2017.*/
import * as types from './mutation-types';
export default {
  [types.REGISTER_NAV_MENUS](state, navMenu) {
    state.navMenus.push(navMenu);
  }
};
