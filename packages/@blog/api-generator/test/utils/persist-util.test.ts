import * as path from 'path';
import * as rimraf from 'rimraf';

import persistUtil from '../../lib/utils/persist-util';
import postsApi from '../../lib/v1/posts-api';
import seoApi from '../../lib/v1/seo-api';

import * as posts from '../v1/fixtures/json/posts-sample.json';
import * as config from '../v1/fixtures/json/config-sample.json';

describe('@blog/api-generator: persist-util', (): void => {

  const TMP_DIST_DIR = path.join(__dirname, '/dist/');

  beforeAll((done): void => {
    rimraf(TMP_DIST_DIR, (): void => {
      done();
    });
  });


  it('# should persist posts overview json data correctly', (): void => {
    const postsOverviewQuery = postsApi.generatePostsOverview(posts);
    persistUtil.persist(TMP_DIST_DIR, postsOverviewQuery);
  });

  it('# should persist posts detail json data correctly', (): void => {
    const postsMap = postsApi.generatePostsQuery(posts);
    persistUtil.persist(TMP_DIST_DIR, postsMap);
  });

  it('# should persist categories overview json data correctly', (): void => {
    const categoriesOverviewQuery = postsApi.generateCategoriesOverview(posts);
    persistUtil.persist(TMP_DIST_DIR, categoriesOverviewQuery);
  });

  it('# should persist categories detail data correctly', (): void => {
    const categoriesMap = postsApi.generateCategoriesQuery(posts);
    persistUtil.persist(TMP_DIST_DIR, categoriesMap);
  });

  it('# should persist tags overview tags json data correctly', (): void => {
    const tagsOverviewQuery = postsApi.generateTagsOverview(posts);
    persistUtil.persist(TMP_DIST_DIR, tagsOverviewQuery);
  });

  it('# should persist tags detail data correctly', (): void => {
    const tagsMap = postsApi.generateTagsQuery(posts);
    persistUtil.persist(TMP_DIST_DIR, tagsMap);
  });

  it('# should persist sitemap xml correctly', (): void => {
    const sitemapApi = seoApi.generateSiteMapApi(config, posts);
    persistUtil.persist(TMP_DIST_DIR, sitemapApi, '.xml');
  });

  it('# should persist feeds xml correctly', (): void => {
    const feedsApi = seoApi.generateFeedsApi(config, posts);
    persistUtil.persist(TMP_DIST_DIR, feedsApi, '');
  });

  it('# should persist robots.txt correctly', async (): Promise<void> => {
    const robotsApi = await seoApi.generateRobotsTxt(config);
    persistUtil.persist(TMP_DIST_DIR, robotsApi, '');
  });
});
