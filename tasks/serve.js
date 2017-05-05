/* Created by Aquariuslt on 16/04/2017.*/
import gulp from 'gulp';
import gutil from 'gulp-util';


import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import addDevServerEntrypoints from 'webpack-dev-server/lib/util/addDevServerEntrypoints';

import webpackDevConfig from './config/webpack.dev.config.babel';
import logger from './util/logger';
import baseConfig from './config/base.config';
import pathUtil from './util/path-util';
import serverFactory from 'spa-server';

gulp.task('serve', function () {
  logger.info('Webpack building.');
  addDevServerEntrypoints(webpackDevConfig, webpackDevConfig.devServer);
  let compilerConfig = webpack(webpackDevConfig);
  new WebpackDevServer(compilerConfig, webpackDevConfig.devServer)
    .listen(webpackDevConfig.devServer.port, webpackDevConfig.devServer.host, function (error) {
      if (error) {
        throw new gutil.PluginError('webpack', error);
      }
    });
});

gulp.task('spa-server', function () {
  let server = serverFactory.create({
    path: pathUtil.root(baseConfig.dir.dist),
    port: 80,
    fallback: {
      'text/html': '/index.html'
    }
  });
  server.start();
});
