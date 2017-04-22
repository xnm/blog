/* Created by Aquariuslt on 23/04/2017.*/
import _ from 'lodash';
export default {
  title: (state) => {
    const DEFAULT_TITLE = '';
    if (!_.isEmpty(state.applicationProperties)) {
      return state.applicationProperties.blog.name;
    }
    return DEFAULT_TITLE;
  },
  avator: (state) => {
    const DEFAULT_AVATOR = '';
    if(!_.isEmpty(state.applicationProperties)) {
      return state.applicationProperties.blog.avator;
    }
    return DEFAULT_AVATOR;
  },
  externalLinks: (state) => {
    const DEFAULT_EXT_LINKS = [];
    if (!_.isEmpty(state.applicationProperties)) {
      return state.applicationProperties.blog.externalLinks;
    }
    return DEFAULT_EXT_LINKS;
  }
};
