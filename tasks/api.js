import gulp from 'gulp';
import yaml from 'gulp-yaml';
import rename from 'gulp-rename';
import sequence from 'gulp-sequence';
import log from 'fancy-log';
import mkdirp from 'mkdirp';
import fs from 'fs';
import _ from 'lodash';

import baseConfig from './config/base.config';

import pathUtil from './utils/path-util';

import marki from '../lib/md';

/**
 * Generating static client side apis
 * */

const APPLICATION_YML = 'application.yml';
const APPLICATION_JSON = 'application.json';

gulp.task('api:application', function(done) {
  log.info('Building application.properties');
  gulp.src(APPLICATION_YML).pipe(yaml({
    space: 2
  })).pipe(rename(APPLICATION_JSON)).pipe(gulp.dest(baseConfig.dir.build + '/api')).on('end', done);
});

gulp.task('api:posts', function(done) {
  log.info('Analysing posts sources');
  const postsLocationPattern = pathUtil.resolve(baseConfig.dir.posts) + '/**/*.md';
  let markiMultiContext = marki.analyseMulti(postsLocationPattern);

  // generate posts
  mkdirp.sync(pathUtil.resolve(baseConfig.dir.build) + '/api/' + baseConfig.dir.post);

  _.each(markiMultiContext.contexts, function(context) {
    log.info('Generating Post:', context.metadata.filename);
    fs.writeFileSync(pathUtil.resolve(baseConfig.dir.build) + '/api/' + baseConfig.dir.post + '/' + context.metadata.filename + '.json', JSON.stringify(context, null, 2));
  });

  // generate indexes
  fs.writeFileSync(pathUtil.resolve(baseConfig.dir.build) + '/api/' + 'indexes.json', JSON.stringify(markiMultiContext.indexes, null, 2));

  // generate posts
  done();
});

gulp.task('api', sequence(
  ['api:application'],
  ['api:posts']
));
