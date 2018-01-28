import gulp from 'gulp';
import log from 'fancy-log';
import sequence from 'gulp-sequence';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import addDevServerEntrypoints from 'webpack-dev-server/lib/util/addDevServerEntrypoints';

import webpackDevConfig from './config/webpack.dev.babel';

gulp.task('webpack-dev-server', function() {
  log.info('Webpack-dev-server serving');
  addDevServerEntrypoints(webpackDevConfig, webpackDevConfig.devServer);
  let compilerConfig = webpack(webpackDevConfig);
  new WebpackDevServer(compilerConfig, webpackDevConfig.devServer).listen(webpackDevConfig.devServer.port, webpackDevConfig.devServer.host, function(error) {
    if (error) {
      log.error('Webpack-dev-server error:', error);
    }
  });
});

gulp.task('serve', sequence(['clean:build'], ['api'], ['webpack-dev-server']));
