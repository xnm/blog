/* settings for deploying github pages */

import gulp from 'gulp';
import rename from 'gulp-rename';
import sequence from 'gulp-sequence';
import _ from 'lodash';
import fs from 'fs';
import log from 'fancy-log';
import mkdirp from 'mkdirp';

import pathUtil from '../config/utils/path-util';

import baseConfig from '../config/base.config';
import appConfig from '../config/app.config';

const CNAME_FILENAME = 'CNAME';
const FALLBACK_FILENAME = '404.html';
const NOJEKYLL_FILENAME = '.nojekyll';

gulp.task('cname', function(done) {
  log.info('Generate CNAME');
  let cname = _.get(appConfig, 'cname');
  if (cname) {
    fs.writeFileSync(pathUtil.resolve(baseConfig.dir.dist.root) + '/' + CNAME_FILENAME, cname);
    done();
  }
});

gulp.task('fallback', function(done) {
  gulp.src(pathUtil.resolve(baseConfig.dir.dist.root) + '/index.html').pipe(rename(FALLBACK_FILENAME)).pipe(gulp.dest(pathUtil.resolve(baseConfig.dir.dist.root))).on('end', function() {
    done();
  });
});

gulp.task('spa', function(done) {
  function replaceTitleInHtmlString(htmlString, injectedTitle) {
    let originalTitle = '<title>' + appConfig['title'] + '</title>';
    let newTitle = '<title>' + injectedTitle + ' | ' + appConfig['title'] + '</title>';
    return _.replace(htmlString, originalTitle, newTitle);
  }

  let indexesDataPath = baseConfig.dir.build + '/api/' + 'indexes.json';
  let indexesString = fs.readFileSync(indexesDataPath).toString();
  let indexes = JSON.parse(indexesString);
  let indexHtmlString = fs.readFileSync(pathUtil.resolve(baseConfig.dir.dist.root) + '/' + 'index.html');

  fs.writeFileSync(pathUtil.resolve(baseConfig.dir.dist.root) + '/' + NOJEKYLL_FILENAME, '');

  _.each(indexes, function(index) {
    mkdirp.sync(pathUtil.resolve(baseConfig.dir.dist.root) + index.link);
    fs.writeFileSync(pathUtil.resolve(baseConfig.dir.dist.root) + index.link + '/' + 'index.html', replaceTitleInHtmlString(indexHtmlString, index.title));
  });

  done();
});

gulp.task('pages', sequence(['cname', 'fallback', 'spa']));
