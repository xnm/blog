const SPACER = ' | ';
const COLON = ' : ';

/**
 * @param {String} title
 * */
function setTitle(title) {
  document.title = title + SPACER + document.title;
}

/**
 * @param {Object} post
 * */
function setPostTitle(post) {
  document.title = post.metadata.title + SPACER + document.title;
}

/**
 * @param {String} filterType
 * @param {String} filterValue
 * */
function setFilteredTitle(filterType, filterValue) {
  document.title = filterType + COLON + filterValue + SPACER + document.title;
}

export default {
  setTitle,
  setPostTitle,
  setFilteredTitle
};
