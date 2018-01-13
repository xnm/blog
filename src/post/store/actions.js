import * as types from './mutation-types';
import * as coreTypes from '@/core/store/mutation-types';
import postApi from '../api/post.api';
import store from '@/store';
import locale from '@/locale';
import menuUtil from '@/core/utils/menu-util';

import _ from 'lodash';

export default {
  [types.LOAD_POSTS_INDEXES]({commit, dispatch}) {
    postApi.getPostsIndexes().then((res) => {
      commit(types.LOAD_POSTS_INDEXES, res.data);
      dispatch(types.REGISTER_CATEGORIES_MENU, res.data);
      dispatch(types.REGISTER_TAGS_MENU);
    });
  },
  [types.REGISTER_CATEGORIES_MENU]({}, indexes) {
    let categories = _.union(_.map(indexes, (index) => index.category));
    let categoryMap = {};
    _.each(categories, (category) => {
      categoryMap[_.lowerCase(category)] = {
        name: category,
        url: '/category/' + _.lowerCase(category),
        desc: category
      };
    });
    store.commit(coreTypes.REGISTER_NAV_MENUS, menuUtil.convertExpandableMenu(locale.t('post.nav.categories'), categoryMap, {icon: 'format_list_numbered', priority: 1}));
  },
  [types.REGISTER_TAGS_MENU]({}) {
    let tagsLink = '/tags';
    store.commit(coreTypes.REGISTER_NAV_MENUS, menuUtil.convertDirectMenu(locale.t('post.nav.tags'), tagsLink, {icon: 'style', priority: 2}));
  }
};
