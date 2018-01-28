/* settings for deploying github pages */

import gulp from 'gulp';
import rename from 'gulp-rename';
import sequence from 'gulp-sequence';
import _ from 'lodash';
import fs from 'fs';
import log from 'fancy-log';
import mkdirp from 'mkdirp';

import pathUtil from './utils/path-util';

import baseConfig from './config/base.config';
import appConfig from './config/app.config';

const CNAME_FILENAME = 'CNAME';
const FALLBACK_FILENAME = '404.html';
const NOJEKYLL_FILENAME = '.nojekyll';

gulp.task('cname', function(done) {
  log.info('Generate CNAME');
  let cname = _.get(appConfig, 'cname');
  if (cname) {
    fs.writeFileSync(pathUtil.resolve(baseConfig.dir.dist) + '/' + CNAME_FILENAME, cname);
    done();
  }
});

gulp.task('fallback', function(done) {
  gulp.src(pathUtil.resolve(baseConfig.dir.dist) + '/index.html').pipe(rename(FALLBACK_FILENAME)).pipe(gulp.dest(pathUtil.resolve(baseConfig.dir.dist))).on('end', function() {
    done();
  });
});

gulp.task('spa', function(done) {
  let indexesDataPath = baseConfig.dir.build + '/api/' + 'indexes.json';
  let indexesString = fs.readFileSync(indexesDataPath).toString();
  let indexes = JSON.parse(indexesString);

  fs.writeFileSync(pathUtil.resolve(baseConfig.dir.dist) + '/' + NOJEKYLL_FILENAME, '');

  _.each(indexes, function(index) {
    mkdirp.sync(pathUtil.resolve(baseConfig.dir.dist) + index.link);
    fs.writeFileSync(pathUtil.resolve(baseConfig.dir.dist) + index.link + '/' + 'index.html', '/index.html');
  });

  done();
});

gulp.task('pages', sequence(['cname', 'fallback', 'spa']));
