import postUtil from '../utils/post-util';
import * as _ from 'lodash';
import * as path from "path";
import * as fs from 'fs';
import Overview = BlogApiModel.Overview;

const API_PREFIX = '/api/v1';
const POSTS_API_PREFIX = '/posts';
const CATEGORIES_API_PREFIX = '/categories';
const TAGS_API_PREFIX = '/tags';

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

/**
 * @return permalink
 * @example
 * - /api/v1/posts/2018/12/30/some-article
 */
const getPermalink = (post: BlogModel.Post): string => API_PREFIX + POSTS_API_PREFIX + postUtil.getTimePrefix(post) + postUtil.getPostTitleLink(post);

const fillPermalink = (data: BlogModel.Post[]) => {
  _.each(data, (post) => {
    post.permalink = getPermalink(post);
  });
};

const sortByCreated = (data: BlogModel.Post[]) => {
  data.sort((a, b) => {
    return (a.metadata.created < b.metadata.created) ? 1 : -1;
  });
};

/**
 * @desc to reduce query response size, set `md` and `html` to empty string
 */
const reduceSizes = (data: BlogModel.Post[]) => {
  _.each(data, (post) => {
    post.md = '';
    post.html = '';
  });
};

const getCategoriesQueryLink = (category): string => API_PREFIX + CATEGORIES_API_PREFIX + '/' + category;
const getTagsQueryLink = (tag): string => API_PREFIX + TAGS_API_PREFIX + '/' + tag;


function generatePostsQuery(data: BlogModel.Post[]): BlogApiModel.PostsPermalinkQuery {
  fillPermalink(data);


  const postApiMap = {};
  _.each(data, (post) => {
    const permalink = post.permalink;
    if (permalink) {
      postApiMap[permalink] = post;
    }
  });

  return postApiMap;
}

function generatePostsOverview(data: BlogModel.Post[]): BlogApiModel.PostsOverview {
  fillPermalink(data);
  reduceSizes(data);
  sortByCreated(data);

  return data;
}


function generateCategoriesQuery(data: BlogModel.Post[]): BlogApiModel.CategoriesQuery {
  fillPermalink(data);
  reduceSizes(data);
  sortByCreated(data);

  return _.groupBy(data, (post) => {
    return getCategoriesQueryLink(post.metadata.category);
  });
}

function generateCategoriesOverview(data: BlogModel.Post[]): BlogApiModel.CategoriesOverview {
  const categoriesMap = _.groupBy(data, (post) => {
    return post.metadata.category;
  });

  const categoriesOverview: Overview[] = [];
  _.each(_.keys(categoriesMap), (category) => {
    categoriesOverview.push({
      name: category,
      total: categoriesMap[category].length,
      link: getCategoriesQueryLink(category)
    });
  });

  return categoriesOverview;
}


function generateTagsQuery(data: BlogModel.Post[]): BlogApiModel.TagsQuery {
  fillPermalink(data);
  reduceSizes(data);
  sortByCreated(data);

  const tagsQuery = {};

  _.each(data, (post) => {
    if (post.metadata.tags) {
      _.each(post.metadata.tags, (tag) => {
        const tagApiPrefix = getTagsQueryLink(tag);
        if (!tagsQuery.hasOwnProperty(tagApiPrefix)) {
          tagsQuery[tagApiPrefix] = [];
        }
        tagsQuery[tagApiPrefix].push(post);
      });
    }
  });

  return tagsQuery;
}

function generateTagsOverview(data: BlogModel.Post[]): BlogApiModel.TagsOverview {
  const tagsMap = {};
  _.each(data, (post) => {
    if (post.metadata.tags) {
      _.each(post.metadata.tags, (tag) => {
        if (!tagsMap.hasOwnProperty(tag)) {
          tagsMap[tag] = {
            name: tag,
            total: 0,
            link: getTagsQueryLink(tag)
          };
        }
        tagsMap[tag].total++;
      });
    }
  });

  return _.values(tagsMap);
}


export default {
  init,
  generatePostsQuery,
  generatePostsOverview,
  generateCategoriesOverview,
  generateCategoriesQuery,
  generateTagsOverview,
  generateTagsQuery
};
