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
  author: (state) => {
    const DEFAULT_AUTHOR = '';
    if (!_.isEmpty(state.applicationProperties)) {
      return state.applicationProperties.blog.author;
    }
    return DEFAULT_AUTHOR;
  },
  avator: (state) => {
    const DEFAULT_AVATOR = '';
    if (!_.isEmpty(state.applicationProperties)) {
      return state.applicationProperties.blog.avator;
    }
    return DEFAULT_AVATOR;
  },
  description: (state) => {
    const DEFAULT_DESCRIPTION = '';
    if (!_.isEmpty(state.applicationProperties)) {
      return state.applicationProperties.blog.description;
    }
    return DEFAULT_DESCRIPTION;
  },
  externalLinks: (state) => {
    const DEFAULT_EXT_LINKS = [];
    if (!_.isEmpty(state.applicationProperties)) {
      return state.applicationProperties.blog.externalLinks;
    }
    return DEFAULT_EXT_LINKS;
  }
};
