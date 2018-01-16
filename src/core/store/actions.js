import locale from '@/locale';
import coreApi from '../api/core.api';
import * as types from './mutation-types';

import menuUtil from '../utils/menu-util';

export default {
  [types.LOAD_APP_CONFIG]({commit}) {
    coreApi.getApplicationConfig().then((res) => {
      commit(types.LOAD_APP_CONFIG, res.data);
      commit(types.REGISTER_NAV_MENUS, menuUtil.convertExpandableMenu(locale.t('core.nav.links'), res.data.links));
      commit(types.REGISTER_NAV_MENUS, menuUtil.convertDirectMenu(locale.t('core.nav.home'), '/', {icon: 'home', priority: -1}));
    });
  }
};
