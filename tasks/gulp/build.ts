import * as gulp from 'gulp';
import * as logger from 'fancy-log';

import * as webpack from 'webpack';

import {webpackProdConfig} from '../webpack/webpack.prod';

gulp.task('webpack', (done) => {
  webpack(webpackProdConfig, (error, stats) => {
    logger.info('Webpack build done');
    if (error || stats.hasErrors()) {
      logger.error('Webpack build error:', error);
    }
    logger.info(stats.toString(webpackProdConfig.stats));
    done();
  });
});

gulp.task('build', gulp.series('clean', 'webpack'));
