import _ from 'lodash';

const SPACER = ' | ';
const COLON = ' : ';

function setTitle(title) {
  document.title = title + SPACER + document.title;
}

function setPostTitle(post) {
  document.title = post.metadata.title + SPACER + document.title;
}

function setFilteredTitle(filterType, filterValue) {
  document.title = filterType + COLON + filterValue + SPACER + document.title;
}

export default {
  setTitle,
  setPostTitle,
  setFilteredTitle
};
