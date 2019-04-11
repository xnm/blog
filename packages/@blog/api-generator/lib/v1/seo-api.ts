import * as sm from 'sitemap';
import {Feed} from 'feed';
import {format} from "date-fns";


const POSTS_URL_PREFIX = '/posts';


const SITEMAP_URL = '/sitemap';

const FEEDS_RSS2_URL = '/rss';
const FEEDS_ATOM_URL = '/atom';
const FEEDS_JSON_URL = '/json';

const buildPostPermalink = (created: string, filename: string): string => POSTS_URL_PREFIX + '/' + format((new Date(created)), 'YYYY/MM/DD') + '/' + filename;


function generateFeedsApi(config: Config.App, data: BlogModel.Post[]) {
  const toPostFeedItem = (post: BlogModel.Post) => ({
    title: post.metadata.title,
    id: config.host + buildPostPermalink(post.metadata.created, post.filename),
    url: config.host + buildPostPermalink(post.metadata.created, post.filename),
    link: config.host + buildPostPermalink(post.metadata.created, post.filename),
    description: post.summary,
    content: post.html,
    date: new Date(post.metadata.created),
    image: post.metadata.cover
  });


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

  data.map((post) => feed.addItem(toPostFeedItem(post)));

  return {
    [FEEDS_RSS2_URL]: feed.rss2(),
    [FEEDS_ATOM_URL]: feed.atom1(),
    [FEEDS_JSON_URL]: feed.json1()
  };
}

function generateSiteMapApi(config: Config.App, data: BlogModel.Post[]) {
  const toSitemapUrl = (post: BlogModel.Post) => ({
    url: buildPostPermalink(post.metadata.created, post.filename)
  });

  const hostname = config.host;


  const sitemap = sm.createSitemap({
    hostname,
    urls: data.map(toSitemapUrl)
  });

  return {
    [SITEMAP_URL]: sitemap
  };
}


export default {
  generateFeedsApi,
  generateSiteMapApi
};
