import * as _ from 'lodash';
import seoApi from '../../lib/v1/seo-api';

import * as posts from './fixtures/json/posts-sample.json';
import * as config from './fixtures/json/config-sample.json';


describe('@blog/api-generator: seo-api', () => {


  it('# should generate sitemap.xml correctly', () => {
    const sitemapApi = seoApi.generateSiteMapApi(config, posts);
    expect(sitemapApi[_.keys(sitemapApi)[0]]).toContain(posts[0].filename);
  });

  it('# should generate atom/rss correctly', () => {
    const feedsApi = seoApi.generateFeedsApi(config, posts);
    expect(feedsApi).toHaveProperty('/atom');
    expect(feedsApi).toHaveProperty('/json');
    expect(feedsApi).toHaveProperty('/rss');
  });
});
