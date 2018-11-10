import logger from 'fancy-log';
import gulp from 'gulp';
import opn from 'opn';
import webpack from 'webpack';

import WebpackDevServer from 'webpack-dev-server';
import addEntries from 'webpack-dev-server/lib/utils/addEntries';

import webpackDevConfig from '../webpack/webpack.dev.babel';
import packageJson from '../../package.json';

const baseConfig = packageJson.config.base;

const LOCAL_IP = '127.0.0.1';
const AUTO_OPEN_URL = 'http://' + LOCAL_IP + ':' + baseConfig.dev.port;

gulp.task('serve', function() {
  logger.info('Webpack building.');
  addEntries(webpackDevConfig, webpackDevConfig.devServer);
  let compilerConfig = webpack(webpackDevConfig);
  new WebpackDevServer(compilerConfig, webpackDevConfig.devServer).listen(webpackDevConfig.devServer.port, webpackDevConfig.devServer.host, function(error) {
    if (error) {
      logger.error('Webpack build error:', error);
    }
    logger.info('Open: ', AUTO_OPEN_URL);
    opn(AUTO_OPEN_URL);
  });
});
