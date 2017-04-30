/* Created by Aquariuslt on 22/04/2017.*/
import _ from 'lodash';

import coreApi from '../api/core.api';
import * as types from './mutation-types';


export default {
  [types.LOAD_APPLICATION_PROPERTIES]({commit}) {
    coreApi.getApplicationProperties().then((res) => {
      commit(types.LOAD_APPLICATION_PROPERTIES, res.data);
    });
  },
  [types.REGISTER_NAV_MENUS]({commit}, routes){
    _.each(routes, function (route) {
      if (!_.isUndefined(route.meta) && _.isEqual(route.meta.showInNavMenu, true)) {
        commit(types.REGISTER_NAV_MENUS, route);
      }
    });
  },
  [types.REGISTER_SUB_NAV_MENUS]({commit, state}, subNavMenus){
    if (_.isUndefined(_.find(state.subNavMenus, {label: subNavMenus.label}))) {
      commit(types.REGISTER_SUB_NAV_MENUS, subNavMenus);
    }
  }

};
