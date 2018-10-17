import fs from 'fs';
import gulp from 'gulp';
import log from 'fancy-log';
import _ from 'lodash';

import RSS from 'rss';
import pathUtil from '../config/utils/path-util';

import baseConfig from '../config/base.config';
import appConfig from '../config/app.config';

const DEFAULT_SITE_PROTOCOL = 'https://';
const DEFAULT_TTL = '60';

const FEED_FILENAME = 'feed.xml';

function getFeedOptions() {
  return {
    title: appConfig['title'],
    description: appConfig['description'],
    feed_url: DEFAULT_SITE_PROTOCOL + appConfig['cname'] + '/' + FEED_FILENAME,
    site_url: DEFAULT_SITE_PROTOCOL + appConfig['cname'],
    image_url: DEFAULT_SITE_PROTOCOL + appConfig['cname'] + '/' + baseConfig.file.favicon,
    managingEditor: appConfig['author'],
    webMaster: appConfig['author'],
    copyright: appConfig['copyright'],
    language: 'en',
    pubDate: new Date(),
    ttl: DEFAULT_TTL
  };
}

function getFeedItem(index) {
  return {
    title: index['title'],
    description: index['summary'],
    url: DEFAULT_SITE_PROTOCOL + appConfig['cname'] + index['link'],
    guid: DEFAULT_SITE_PROTOCOL + appConfig['cname'] + index['link'],
    categories: [index['category']],
    author: appConfig['author'],
    date: index['created']
  };
}

gulp.task('feed', function(done) {
  log.info('Generating Sitemap:');

  let indexesDataPath = baseConfig.dir.build + '/api/' + 'indexes.json';
  let indexesString = fs.readFileSync(indexesDataPath).toString();
  let indexes = JSON.parse(indexesString);

  let feedOptions = getFeedOptions();
  let feed = new RSS(feedOptions);

  _.each(indexes, function(index) {
    feed.item(getFeedItem(index));
  });

  fs.writeFileSync(pathUtil.resolve(baseConfig.dir.dist.root) + '/' + FEED_FILENAME, feed.xml({indent: true}));

  done();
});
