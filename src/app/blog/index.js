/* Created by Aquariuslt on 4/28/17.*/

import _ from 'lodash';

import router from '../../router';
import blogRoutes from './routes/blog.routes';

import store from '../../store';
import blogStore from './stores/blog.store';
import blogApi from './api/blog.api';

import * as types from '../core/stores/mutation-types';

store.registerModule('blog', blogStore);
router.addRoutes(blogRoutes);


router.afterEach((to) => {
  let appTitle = store.getters.title;
  if (_.isEmpty(appTitle) || _.isUndefined(appTitle)) {
    appTitle = document.title;
  }


  if (to.meta && !_.isUndefined(to.meta.title)) {
    let titleExpression = to.meta.title;
    _.each(_.keys(to.params), (paramName) => {
      if (_.includes(titleExpression, paramName)) {
        titleExpression = titleExpression.replace(paramName, to.params[paramName]);
      }
    });

    document.title = titleExpression + ' | ' + appTitle;
  }
  else {
    document.title = appTitle;
  }
});

store.dispatch(types.REGISTER_NAV_MENUS, blogRoutes);
blogApi.getIndexes()
  .then((res) => {
    const CATEGORY = 'Category';
    const TAG = 'Tag';

    let indexes = res.data;


    let categoryList = _.union(_.map(indexes, (index) => {
      return index.category;
    }));

    let categoryNavMenus = {
      label: CATEGORY,
      icon: 'category',
      prefix: _.lowerCase('/' + CATEGORY),
      items: categoryList
    };
    store.dispatch(types.REGISTER_SUB_NAV_MENUS, categoryNavMenus);


    let tagList = _.union(_.reduce(indexes, (dupTagList, index) => {
      return dupTagList.concat(index.tags);
    }, []));

    let tagNavMenus = {
      label: TAG,
      icon: 'turned_in',
      prefix: _.lowerCase('/' + TAG),
      items: tagList
    };
    store.dispatch(types.REGISTER_SUB_NAV_MENUS, tagNavMenus);
  });


