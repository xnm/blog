import axios from 'axios';

function getPostsIndexes() {
  const postsIndexes = '/api/indexes.json';
  return axios.get(postsIndexes);
}

function getPost(shortname) {
  const postApiPrefix = '/api/post/';
  return axios.get(postApiPrefix + shortname + '.json');
}

export default {
  getPostsIndexes,
  getPost
};
