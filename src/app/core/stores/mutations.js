/* Created by Aquariuslt on 22/04/2017.*/
import * as types from './mutation-types';
export default {
  [types.REGISTER_NAV_MENUS](state, navMenu) {
    state.navMenus.push(navMenu);
  },
  [types.REGISTER_SUB_NAV_MENUS](state, subNavMenu){
    state.subNavMenus.push(subNavMenu);
  },
  [types.LOAD_APPLICATION_PROPERTIES](state, applicationProperties){
    state.applicationProperties = applicationProperties;
  }
};
