import gulp from 'gulp';
import logger from 'fancy-log';
import rimraf from 'gulp-rimraf';
import sequence from 'gulp-sequence';

import packageJson from '../../package.json';


const baseConfig = packageJson.config.base;

gulp.task('clean:build', () => {
  logger.info('Deleting build folder');
  return gulp.src(baseConfig.dir.build).pipe(rimraf());
});

gulp.task('clean:dist', () => {
  logger.info('Deleting dist folder');
  return gulp.src(baseConfig.dir.dist.root).pipe(rimraf());
});

gulp.task('clean', sequence(['clean:build', 'clean:dist']));
