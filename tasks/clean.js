import gulp from 'gulp';
import log from 'fancy-log';
import rimraf from 'gulp-rimraf';
import sequence from 'gulp-sequence';

import baseConfig from './config/base.config';

gulp.task('clean:cache', function() {
  log.info('Deleting cache folder');
  return gulp.src(baseConfig.dir.cache).pipe(rimraf());
});

gulp.task('clean:build', function() {
  log.info('Deleting build folder');
  return gulp.src(baseConfig.dir.build).pipe(rimraf());
});

gulp.task('clean:dist', function() {
  log.info('Deleting dist folder');
  return gulp.src(baseConfig.dir.dist).pipe(rimraf());
});

gulp.task('clean', sequence(['clean:cache', 'clean:build', 'clean:dist']));
