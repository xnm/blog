import axios, { AxiosPromise } from 'axios';
import PostsOverview = BlogApiModel.PostsOverview;
import Post = BlogModel.Post;

const API_PREFIX = 'api/v1/posts';
const API_SUFFIX = '.json';

function loadAllPosts(): AxiosPromise<PostsOverview> {
  return axios.get(`${API_PREFIX}${API_SUFFIX}`);
}

function findPosts(year: string, month?: string): AxiosPromise<PostsOverview> {
  const url = month ? `${API_PREFIX}/${year}/${month}${API_SUFFIX}` : `${API_PREFIX}/${year}${API_SUFFIX}`;
  return axios.get(url);
}

function loadPost(permalink: string):AxiosPromise<Post> {
  return axios.get(`${API_PREFIX}${permalink}${API_SUFFIX}`);
}


export default {
  findPosts,
  loadAllPosts,
  loadPost
};
