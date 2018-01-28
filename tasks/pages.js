/* settings for deploying github pages */

import gulp from 'gulp';
import sequence from 'gulp-sequence';
import _ from 'lodash';
import fs from 'fs';
import log from 'fancy-log';

import pathUtil from './utils/path-util';

import baseConfig from './config/base.config';
import appConfig from './config/app.config';

const CNAME_FILENAME = 'CNAME';

gulp.task('cname', function(done) {
  log.info('Generate CNAME');
  let cname = _.get(appConfig, 'cname');
  if (cname) {
    fs.writeFileSync(pathUtil.resolve(baseConfig.dir.dist) + '/'+CNAME_FILENAME, cname);
    done();
  }
});

gulp.task('github', sequence(['cname']));
