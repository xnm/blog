/* Created by Aquariuslt on 15/04/2017.*/
import gulp from 'gulp';
import rimraf from 'gulp-rimraf';
import sequence from 'gulp-sequence';

import logger from './util/logger';
import config from './config/base.config';



gulp.task('clean', sequence(['clean-cache', 'clean-build', 'clean-dist']));


gulp.task('clean-cache', function () {
  logger.info('Deleting cache folder');
  return gulp.src(config.dir.cache)
    .pipe(rimraf());
});

gulp.task('clean-build', function () {
  logger.info('Deleting build folder');
  return gulp.src(config.dir.build)
    .pipe(rimraf());
});

gulp.task('clean-dist', function () {
  logger.info('Deleting dist folder');
  return gulp.src(config.dir.dist)
    .pipe(rimraf());
});
