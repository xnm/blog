/* settings for deploying github pages */

import gulp from 'gulp';
import rename from 'gulp-rename';
import sequence from 'gulp-sequence';
import _ from 'lodash';
import fs from 'fs';
import log from 'fancy-log';

import pathUtil from './utils/path-util';

import baseConfig from './config/base.config';
import appConfig from './config/app.config';

const CNAME_FILENAME = 'CNAME';
const FALLBACK_FILENAME = '404.html';

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

gulp.task('pages', sequence(['cname', 'fallback']));
