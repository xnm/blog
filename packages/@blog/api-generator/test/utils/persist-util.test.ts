import * as path from 'path';

import persistUtil from '../../lib/utils/persist-util';
import postsApi from '../../lib/v1/posts-api';

import * as posts from '../v1/fixtures/json/posts-sample.json';

describe('@blog/api-generator: persist-util', () => {

  it('# should persist posts overview json data correctly', () => {
    const postsOverviewQuery = postsApi.generatePostsOverview(posts);
    persistUtil.persist(path.join(__dirname, '/dist/'), postsOverviewQuery);
  });

  it('# should persist posts detail json data correctly', () => {
    const postsMap = postsApi.generatePostsQuery(posts);
    persistUtil.persist(path.join(__dirname, '/dist/'), postsMap);
  });

  it('# should persist categories overview json data correctly', () => {
    const categoriesOverviewQuery = postsApi.generateCategoriesOverview(posts);
    persistUtil.persist(path.join(__dirname, '/dist/'), categoriesOverviewQuery);
  });

  it('# should persist categories detail data correctly', () => {
    const categoriesMap = postsApi.generateCategoriesQuery(posts);
    persistUtil.persist(path.join(__dirname, '/dist/'), categoriesMap);
  });

  it('# should persist tags overview tags json data correctly', () => {
    const tagsOverviewQuery = postsApi.generateTagsOverview(posts);
    persistUtil.persist(path.join(__dirname, '/dist/'), tagsOverviewQuery);
  });

  it('# should persist tags detail data correctly', () => {
    const tagsMap = postsApi.generateTagsQuery(posts);
    persistUtil.persist(path.join(__dirname, '/dist/'), tagsMap);
  });

});
