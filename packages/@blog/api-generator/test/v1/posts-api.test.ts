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


  it('# should generate posts apis by time', () => {
    const postsMap = postsApi.generatePostsApi(posts);
    expect(_.keys(postsMap).length).toEqual(posts.length);

  });

  it('# should generate categories apis', () => {

  });

  it('# should generate tags apis', () => {

  });

  // TODO: add design about tags cloud
  it('# should generate tags-cloud apis', () => {

  });
});
