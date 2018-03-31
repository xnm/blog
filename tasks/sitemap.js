import gulp from 'gulp';
import log from 'fancy-log';
import _ from 'lodash';
import fs from 'fs';
import xml from 'xml';

import pathUtil from './utils/path-util';

import baseConfig from './config/base.config';
import appConfig from './config/app.config';

const XMLNS = 'http://www.sitemaps.org/schemas/sitemap/0.9';
const SITEMAP_FILENAME = 'sitemap.xml';

gulp.task('sitemap', function(done) {
  log.info('Generating Sitemap:');

  let indexesDataPath = baseConfig.dir.build + '/api/' + 'indexes.json';
  let indexesString = fs.readFileSync(indexesDataPath).toString();
  let indexes = JSON.parse(indexesString);

  let siteName = appConfig.cname;
  let postUrlPrefix = 'https://' + siteName;
  let urlSet = [];
  _.each(indexes, function(index) {
    let metadata = _.clone(index);
    let loc = postUrlPrefix + metadata.link;
    let lastMod = metadata.created;

    let newUrl = createUrlInformation(loc, lastMod);
    urlSet.push(newUrl);
  });

  let siteMapXmlString = xml([
    {
      urlset: urlSet.concat({
        _attr: {
          xmlns: XMLNS
        }
      })
    }
  ], {
    indent: '  '
  });

  fs.writeFileSync(pathUtil.resolve(baseConfig.dir.dist.root) + '/' + SITEMAP_FILENAME, siteMapXmlString);
  done();
});

function createUrlInformation(loc, lastmod) {
  const defaultChangeFreq = 'weekly';
  const defaultPriority = 1.0;
  return {
    url: [
      {loc: loc},
      {lastmod: lastmod},
      {changefreq: defaultChangeFreq},
      {priority: defaultPriority}
    ]
  };
}
