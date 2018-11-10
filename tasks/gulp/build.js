import gulp from 'gulp';
import log from 'fancy-log';
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
    log.info('Webpack build done');
    spinner.stop();
    if (error || stats.hasErrors()) {
      log.error('Webpack build error:', error);
    }
    log.info(stats.toString(webpackProdConfig.stats));
    done();
  });
});

gulp.task('move', () => {
  log.info('Moving build dir files into dist folder');
  gulp.src(baseConfig.dir.build + '/**/*').pipe(gulp.dest(baseConfig.dir.dist.root));
  log.info('Move done');
});

gulp.task('build', sequence(['clean'], ['webpack'], ['move']));
