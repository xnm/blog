import gulp from 'gulp';
import log from 'fancy-log';
import sequence from 'gulp-sequence';
import ora from 'ora';

import webpack from 'webpack';

import baseConfig from './config/base.config';
import webpackProdConfig from './config/webpack.prod.babel';

gulp.task('webpack', function(done) {
  let spinner = ora('Webpack building ...');
  spinner.start();
  webpack(webpackProdConfig, function(error, stats) {
    log.info('Webpack build done');
    spinner.stop();
    if (error || stats.hasErrors()) {
      log.error('Webpack build error:', error);
    }
    log.info(stats.toString(webpackProdConfig.stats));
    done();
  });
});

gulp.task('move', function() {
  log.info('Moving build dir files into dist folder');
  gulp.src(baseConfig.dir.build + '/**/*').pipe(gulp.dest(baseConfig.dir.dist));
  log.info('Move done');
});

gulp.task('build', sequence(['clean'], ['api'], ['webpack'], ['move'], ['sitemap']));
