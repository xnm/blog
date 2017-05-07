/* Created by Aquariuslt on 4/9/17.*/

/**
 * @see https://support.google.com/webmasters/answer/183668?hl=zh-Hant
 * build sitemap.xml
 * */


import gulp from 'gulp';
import config from './config/base.config';
import logger from './util/logger';
import _ from 'lodash';
import fs from 'fs';
import xml from 'xml';
import inject from 'gulp-inject-string';

gulp.task('sitemap', function () {
  logger.info('Generating Sitemap:');

  let applicationPropertiesPath = config.dir.build + '/' + config.output.application;
  let applicationPropertiesString = fs.readFileSync(applicationPropertiesPath).toString();
  let applicationProperties = JSON.parse(applicationPropertiesString);

  let indexesDataPath = config.dir.build + '/' + config.output.indexes;
  let indexesString = fs.readFileSync(indexesDataPath).toString();
  let indexes = JSON.parse(indexesString);

  const XMLNS = 'http://www.sitemaps.org/schemas/sitemap/0.9';
  let siteName = applicationProperties.cname;
  let postUrlPrefix = 'https://' + siteName;
  let urlSet = [];
  _.each(indexes, function (index) {
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
  ]);

  gulp.src(config.input.sitemap)
    .pipe(inject.append(siteMapXmlString))
    .pipe(gulp.dest(config.dir.build))

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
