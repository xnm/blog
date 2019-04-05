import postUtil from '../utils/post-util';
import * as _ from 'lodash';
import * as path from "path";
import * as fs from 'fs';

const API_PREFIX = '/api/v1';
const POST_API_PREFIX = '/posts';

/**
 * @desc init posts object
 * @param files: the scanned md file paths
 * @return posts to be handle
 */
function init(files: string[]): BlogModel.PostFile[] {
  const posts: BlogModel.PostFile[] = [];

  files.forEach((filepath) => {
    const filename = path.basename(filepath, '.md');
    const mdContent = fs.readFileSync(filepath).toString();

    posts.push({
      filename,
      md: mdContent
    });
  });

  return posts;
}

function generatePostsApi(data: BlogModel.Post[]): BlogApiModel.Posts {
  const postMap = _.groupBy(data, (post) => {
    return API_PREFIX + POST_API_PREFIX + postUtil.getTimePrefix(post) + postUtil.getPostTitleLink(post);
  });

  const postApiMap = {};
  _.each(_.keys(postMap), (path) => {
    postApiMap[path] = _.head(postMap[path]);
  });

  return postApiMap;
}

function generateCategoriesApi(data: BlogModel.Post[]) {

}

function generateTagsApi(data: BlogModel.Post[]) {

}

function generateTagsCloudApi(data: BlogModel.Post[]) {

}


export default {
  init,
  generatePostsApi,
  generateCategoriesApi,
  generateTagsApi,
  generateTagsCloudApi
};
