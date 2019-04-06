import {format} from 'date-fns';
import * as _ from 'lodash';

const API_PREFIX = '/api/v1';
const POSTS_API_PREFIX = '/posts';
const CATEGORIES_API_PREFIX = '/categories';
const TAGS_API_PREFIX = '/tags';


const fillPermalink = (data: BlogModel.Post[]) => {
  _.each(data, (post) => {
    post.permalink = buildPermalink(post.metadata.created, post.filename);
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


const buildPermalink = (created: string, filename: string): string => API_PREFIX + POSTS_API_PREFIX + '/' + format((new Date(created)), 'YYYY/MM/DD') + '/' + filename;
const buildCategoriesQueryLink = (category): string => API_PREFIX + CATEGORIES_API_PREFIX + '/' + category;
const buildTagsQueryLink = (tag): string => API_PREFIX + TAGS_API_PREFIX + '/' + tag;


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
    return buildCategoriesQueryLink(post.metadata.category);
  });
}

function generateCategoriesOverview(data: BlogModel.Post[]): BlogApiModel.CategoriesOverview {
  const categoriesMap = _.groupBy(data, (post) => {
    return post.metadata.category;
  });

  const categoriesOverview: BlogApiModel.Overview[] = [];
  _.each(_.keys(categoriesMap), (category) => {
    categoriesOverview.push({
      name: category,
      total: categoriesMap[category].length,
      link: buildCategoriesQueryLink(category)
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
        const tagApiPrefix = buildTagsQueryLink(tag);
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
            link: buildTagsQueryLink(tag)
          };
        }
        tagsMap[tag].total++;
      });
    }
  });

  return _.values(tagsMap);
}


export default {
  generatePostsQuery,
  generatePostsOverview,
  generateCategoriesOverview,
  generateCategoriesQuery,
  generateTagsOverview,
  generateTagsQuery
};
