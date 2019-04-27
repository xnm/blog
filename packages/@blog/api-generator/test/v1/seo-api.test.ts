import * as _ from 'lodash';
import seoApi from '../../lib/v1/seo-api';

import * as posts from './__fixtures__/json/posts-sample.json';
import * as config from './__fixtures__/json/config-sample.json';

describe('@blog/api-generator: seo-api', (): void => {
  it('# should generate sitemap.xml correctly', (): void => {
    const sitemapApi = seoApi.generateSiteMapApi(config, posts);
    expect(sitemapApi[_.keys(sitemapApi)[0]]).toContain(posts[0].filename);
  });

  it('# should generate atom/rss correctly', (): void => {
    const feedsApi = seoApi.generateFeedsApi(config, posts);
    expect(feedsApi).toHaveProperty('/feed/atom');
    expect(feedsApi).toHaveProperty('/feed/json');
    expect(feedsApi).toHaveProperty('/feed/rss');
  });

  it('# should generate robots.txt correctly', async (): Promise<void> => {
    const robotsTxtApi = await seoApi.generateRobotsTxt(config);
    expect(_.head(_.keys(robotsTxtApi))).toEqual('/robots.txt');
    expect(_.keys(robotsTxtApi).length).toEqual(1);
  });
});
