import * as gulp from 'gulp';
import * as logger from 'fancy-log';
import * as webpack from 'webpack';

import pathUtil from '../utils/path-util';
import apiGenerator from '@blog/api-generator';
import configProcessor from '@blog/config-processor';

import webpackProdConfig from '../webpack/webpack.prod';


gulp.task('webpack', (done): void => {
  webpack(webpackProdConfig,
    (error, stats): void => {
      logger.info('Webpack build done');
      if (error || stats.hasErrors()) {
        logger.error('Webpack build error:', error);
      }
      logger.info(stats.toString(webpackProdConfig.stats));
      done();
    });
});


gulp.task('build:api', (done): void => {
  const configPath = pathUtil.resolve('') + '/' + 'config.yml';
  let config = configProcessor.read(configPath);

  const mdFilePath = pathUtil.resolve('') + '/' + config.build.directory.posts;
  const distPath = pathUtil.resolve('') + '/' + config.build.directory.public;

  apiGenerator.generate(configPath, mdFilePath, distPath).then((): void => {
    done();
  });
});


gulp.task('build', gulp.series('clean', 'build:api', 'webpack'));
