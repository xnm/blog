import * as sm from 'sitemap';
import robotstxt from 'generate-robotstxt';
import { Feed } from 'feed';
import { format } from 'date-fns';
import { Item } from 'feed/lib/typings';

const POSTS_URL_PREFIX = '/posts';

const SITEMAP_URL = '/sitemap.xml';

const FEEDS_RSS2_URL = '/feed/rss';
const FEEDS_ATOM_URL = '/feed/atom';
const FEEDS_JSON_URL = '/feed/json';

const ROBOTS_TEXT_URL = '/robots.txt';

const buildPostPermalink = (created: string, filename: string): string =>
  POSTS_URL_PREFIX + '/' + format(new Date(created), 'YYYY/MM/DD') + '/' + filename;

function generateFeedsApi(config: Config.Site, data: BlogModel.Post[]): BlogApiModel.ApiQuery {
  const toPostFeedItem = (post: BlogModel.Post): Item => ({
    title: post.metadata.title,
    id: config.host + buildPostPermalink(post.metadata.created, post.filename),
    link: config.host + buildPostPermalink(post.metadata.created, post.filename),
    description: post.summary,
    content: post.html,
    date: new Date(post.metadata.created),
    image: post.metadata.cover
  });

  const toCategoryName = (post: BlogModel.Post): string => post.metadata.category;

  const feed = new Feed({
    title: config.title,
    description: config.description,
    id: config.host,
    link: config.host,
    language: config.language,
    copyright: config.copyright,
    feedLinks: {
      rss: config.host + '/' + FEEDS_RSS2_URL,
      atom: config.host + '/' + FEEDS_ATOM_URL,
      json: config.host + '/' + FEEDS_JSON_URL
    }
  });

  data.map((post): number => feed.addItem(toPostFeedItem(post)));
  data.map((post): number => feed.addCategory(toCategoryName(post)));

  return {
    [FEEDS_RSS2_URL]: feed.rss2(),
    [FEEDS_ATOM_URL]: feed.atom1(),
    [FEEDS_JSON_URL]: feed.json1()
  };
}

function generateSiteMapApi(config: Config.Site, data: BlogModel.Post[]): BlogApiModel.ApiQuery {
  const toSitemapUrl = (post: BlogModel.Post): object => ({
    url: buildPostPermalink(post.metadata.created, post.filename)
  });

  const hostname = config.host;

  const sitemap = sm.createSitemap({
    hostname,
    urls: data.map(toSitemapUrl)
  });

  return {
    [SITEMAP_URL]: sitemap.toString()
  };
}

async function generateRobotsTxt(config: Config.Site): Promise<object> {
  const robotsTxtContent = await robotstxt({
    sitemap: config.host + SITEMAP_URL,
    host: config.host
  });
  return {
    [ROBOTS_TEXT_URL]: robotsTxtContent
  };
}

export default {
  generateFeedsApi,
  generateSiteMapApi,
  generateRobotsTxt
};
