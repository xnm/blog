import * as _ from 'lodash';
import postsApi from '../../lib/v1/posts-api';

import * as posts from './fixtures/json/posts-sample.json';

describe('@blog/api-generator: posts-api', (): void => {
  it('# should generate posts query by permalink', (): void => {
    const postsMap = postsApi.generatePostsQuery(posts);
    expect(_.keys(postsMap).length).toEqual(posts.length);
    const firstPostApiPath = _.keys(postsMap)[0];
    expect(postsMap[firstPostApiPath].md).not.toEqual('');
  });

  it('# should generate posts overview', (): void => {
    const postsOverviewQuery = postsApi.generatePostsOverview(posts);
    const postsOverview = postsOverviewQuery[_.keys(postsOverviewQuery)[0]];
    expect(postsOverview.length).toEqual(posts.length);
    expect(postsOverview[0].md).toEqual('');
    expect(postsOverview[0].html).toEqual('');
  });

  it('# should generate categories overview', (): void => {
    const categoriesOverviewQuery = postsApi.generateCategoriesOverview(posts);

    const categoriesOverview = categoriesOverviewQuery[_.keys(categoriesOverviewQuery)[0]];

    expect(_.isArray(categoriesOverview)).toBeTruthy();
    expect(categoriesOverview.length).toEqual(3);
    expect(_.head(categoriesOverview)).toHaveProperty('name');
    expect(_.head(categoriesOverview)).toHaveProperty('total');
    expect(_.head(categoriesOverview)).toHaveProperty('link');
  });

  it('# should generate categories query', (): void => {
    const categoriesMap = postsApi.generateCategoriesQuery(posts);
    expect(_.keys(categoriesMap).length).toEqual(posts.length);
    expect(_.keys(categoriesMap)).toEqual([
      '/categories/study',
      '/categories/work',
      '/categories/life'
    ]);

    const firstCategoryApiPath = _.keys(categoriesMap)[0];
    expect(categoriesMap[firstCategoryApiPath][0].md).toEqual('');
    expect(categoriesMap[firstCategoryApiPath][0].html).toEqual('');
  });

  it('# should generate tags overview', (): void => {
    const tagsOverviewQuery = postsApi.generateTagsOverview(posts);
    const tagsOverview = tagsOverviewQuery[_.keys(tagsOverviewQuery)[0]];

    expect(_.isArray(tagsOverview)).toBeTruthy();
    expect(tagsOverview.length).toEqual(6);
    expect(_.head(tagsOverview)).toHaveProperty('name');
    expect(_.head(tagsOverview)).toHaveProperty('total');
    expect(_.head(tagsOverview)).toHaveProperty('link');
  });

  it('# should generate tags query', (): void => {
    const tagsMap = postsApi.generateTagsQuery(posts);

    expect(_.keys(tagsMap).length).toEqual(6);
    expect(_.keys(tagsMap)).toEqual([
      '/tags/javascript',
      '/tags/graphql',
      '/tags/java',
      '/tags/android',
      '/tags/traveling',
      '/tags/memory'
    ]);

    const firstTagApiPath = _.keys(tagsMap)[0];
    expect(tagsMap[firstTagApiPath][0].md).toEqual('');
    expect(tagsMap[firstTagApiPath][0].html).toEqual('');
  });
});
