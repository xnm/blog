import axios from 'axios';

function getPostsIndexes(){
  const postsIndexes = '/api/indexes.json';
  return axios.get(postsIndexes);
}

export default {
  getPostsIndexes
}
