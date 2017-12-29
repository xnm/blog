import gulp from 'gulp';
import sequence from 'gulp-sequence';
import log from 'fancy-log';

/**
 * Generating static client side apis
 * */

gulp.task('application.properties', function(done) {
  log.info('Building application.properties');
  done();
});

gulp.task('posts', function(done) {
  log.info('Generating posts');
  done();
});

gulp.task('api', sequence(
  ['application.properties'],
  ['posts']
));
