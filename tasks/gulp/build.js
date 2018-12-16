import gulp from 'gulp';
import logger from 'fancy-log';
import sequence from 'gulp-sequence';
import ora from 'ora';

import webpack from 'webpack';

import webpackProdConfig from '../webpack/webpack.prod.babel';
import packageJson from '../../package.json';

const baseConfig = packageJson.config.base;

gulp.task('webpack', (done) => {
  let spinner = ora('Webpack building ...');
  spinner.start();
  webpack(webpackProdConfig, (error, stats) => {
    logger.info('Webpack build done');
    spinner.stop();
    if (error || stats.hasErrors()) {
      logger.error('Webpack build error:', error);
    }
    logger.info(stats.toString(webpackProdConfig.stats));
    done();
  });
});

gulp.task('move', () => {
  logger.info('Moving build dir files into dist folder');
  gulp.src(baseConfig.dir.build + '/**/*').pipe(gulp.dest(baseConfig.dir.dist.root));
  logger.info('Move done');
});

gulp.task('build', sequence(['clean'], ['webpack'], ['move']));
