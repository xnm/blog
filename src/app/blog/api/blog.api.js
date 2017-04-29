/* Created by Aquariuslt on 4/28/17.*/
import axios from 'axios';

function getIndexes() {
  const indexesApiUrl = '/api/indexes.json';
  return axios.get(indexesApiUrl);
}

function getPostData(shortUrlName) {
  const postDataUrl = '/api/post/' + shortUrlName + '.json';
  return axios.get(postDataUrl);
}


export default {
  getIndexes,
  getPostData
};
