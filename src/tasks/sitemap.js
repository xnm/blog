/* Created by Aquariuslt on 4/9/17.*/

/**
 * @see https://support.google.com/webmasters/answer/183668?hl=zh-Hant
 * build sitemap.xml
 * */


import gulp from "gulp";
import config from "./config/gulp.config";
import logger from "./util/logger";
import _ from "lodash";
import * as fs from "fs";
import xml from "xml";
import inject from "gulp-inject-string";

gulp.task('sitemap', function (next) {
  logger.info('Generating Sitemap:');

  let applicationPropertiesPath = config.buildDir + '/' + config.output.application;
  let applicationPropertiesString = fs.readFileSync(applicationPropertiesPath).toString();
  let applicationProperties = JSON.parse(applicationPropertiesString);

  let postsDataPath = config.buildDir + '/' + config.output.posts;
  let postListString = fs.readFileSync(postsDataPath).toString();
  let postList = JSON.parse(postListString);

  const XMLNS = 'http://www.sitemaps.org/schemas/sitemap/0.9';
  let siteName = applicationProperties.cname;
  let postUrlPrefix = 'https://' + siteName + '/post/';
  let urlSet = [];
  _.each(postList, function (post) {
    let metadata = post.metadata;
    let loc = postUrlPrefix + metadata.link;
    let lastMod = metadata.updated;

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

  gulp.src(config.sitemap)
    .pipe(inject.append(siteMapXmlString))
    .pipe(gulp.dest(config.buildDir))
    .on('end', function () {
      if (next) {
        next();
      }
    })

});


function createUrlInformation(loc, lastmod) {
  const defaultChangeFreq = 'monthly';
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
