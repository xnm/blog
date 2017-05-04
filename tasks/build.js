/* Created by Aquariuslt on 15/04/2017.*/
import gulp from 'gulp';
import gutil from 'gulp-util';
import sequence from 'gulp-sequence';

import _ from 'lodash';
import fs from 'fs';

import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import PrerenderSpaPlugin from 'prerender-spa-plugin';

import config from './config/base.config';
import webpackProdConfig from './config/webpack.prod.config.babel';
import logger from './util/logger';

gulp.task('build:prod', sequence(['clean'], ['build'], ['webpack'], ['sitemap'], ['pwa'], ['cname'], ['move']));

gulp.task('build', sequence(['properties'], ['posts'], ['move']));


gulp.task('webpack', function (done) {
  logger.info('Webpack building.');
  let indexesDataPath = config.dir.build + '/' + config.output.indexes;
  let indexesString = fs.readFileSync(indexesDataPath).toString();
  let indexes = _.map(JSON.parse(indexesString), function (index) {
    return index.link;
  });

  _.each(indexes, (link) => {
    logger.info('Pre render link:', link);
  });

  let prerenderConfig = {
    plugins: [
      new PrerenderSpaPlugin(
        webpackProdConfig.output.path,
        indexes,
        {
          captureAfterElementExists: '#post-content',
          // navigationLocked: true,
          phantomPageSettings: {
            loadImages: false
          }
        }
      )
    ]
  };

  webpack(webpackMerge(webpackProdConfig, prerenderConfig), function (error, stats) {
    if (error) {
      logger.error('Webpack build error:', error);
      throw new gutil.PluginError('webpack', error);
    }
    gutil.log(stats.toString(webpackProdConfig.stats));
    logger.info('Webpack build done');
    done();
  });
});

gulp.task('move', function () {
  logger.info('Moving build dir files into dist folder');
  gulp.src(config.dir.build + '/**/*')
    .pipe(gulp.dest(config.dir.dist));
  logger.info('Move done');
});




