import * as _ from 'lodash';
import * as path from 'path';

import postScanner from '../..//lib/v1/posts-scanner';
import postsApi from '../../lib/v1/posts-api';

import * as posts from './fixtures/json/posts-sample.json';


describe('@blog/api-generator: posts-api', () => {

  it('# should init posts with scanned file result', () => {
    const mdFiles = postScanner.scan(path.resolve(__dirname, './fixtures'));
    const initedPostFile = postsApi.init(mdFiles);

    expect(initedPostFile.length).toBe(2);
    expect(_.head(initedPostFile)).toHaveProperty('filename');
    expect(_.head(initedPostFile)).toHaveProperty('md');
  });


  it('# should generate posts apis by permalink', () => {
    const postsMap = postsApi.generatePostsApi(posts);
    expect(_.keys(postsMap).length).toEqual(posts.length);

  });


  it('# should generate categories overview', () => {
    const categoriesOverview = postsApi.generateCategoriesOverview(posts);

    expect(_.isArray(categoriesOverview)).toBeTruthy();
    expect(categoriesOverview.length).toEqual(2);
    expect(_.head(categoriesOverview)).toHaveProperty('name');
    expect(_.head(categoriesOverview)).toHaveProperty('total');
    expect(_.head(categoriesOverview)).toHaveProperty('link');
  });

  it('# should generate categories query', () => {
    const categoriesMap = postsApi.generateCategoriesQuery(posts);
    expect(_.keys(categoriesMap).length).toEqual(posts.length);
    expect(_.keys(categoriesMap)).toEqual([
      '/api/v1/categories/life',
      '/api/v1/categories/study'
    ]);
  });

  it('# should generate tags overview', () => {
    const tagsOverview = postsApi.generateTagsOverview(posts);

    expect(_.isArray(tagsOverview)).toBeTruthy();
    expect(tagsOverview.length).toEqual(4);
    expect(_.head(tagsOverview)).toHaveProperty('name');
    expect(_.head(tagsOverview)).toHaveProperty('total');
    expect(_.head(tagsOverview)).toHaveProperty('link');
  });

  it('# should generate tags query', () => {
    const tagsMap = postsApi.generateTagsQuery(posts);

    expect(_.keys(tagsMap).length).toEqual(4);
    expect(_.keys(tagsMap)).toEqual([
      '/api/v1/tags/traveling',
      '/api/v1/tags/memory',
      '/api/v1/tags/javascript',
      '/api/v1/tags/graphql'
    ]);
  });


});
