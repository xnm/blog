import logger from 'fancy-log';
import gulp from 'gulp';
import opn from 'opn';
import webpack from 'webpack';
import http from 'http';
import handler from 'serve-handler';

import WebpackDevServer from 'webpack-dev-server';
import addEntries from 'webpack-dev-server/lib/utils/addEntries';

import webpackDevConfig from '../webpack/webpack.dev.babel';
import packageJson from '../../package.json';

const baseConfig = packageJson.config.base;

const LOCAL_IP = '127.0.0.1';

gulp.task('serve', () => {
  logger.info('Webpack building.');
  addEntries(webpackDevConfig, webpackDevConfig.devServer);
  let compilerConfig = webpack(webpackDevConfig);
  new WebpackDevServer(compilerConfig, webpackDevConfig.devServer).listen(webpackDevConfig.devServer.port, webpackDevConfig.devServer.host, function(error) {
    if (error) {
      logger.error('Webpack build error:', error);
    }
    const AUTO_OPEN_URL = 'http://' + LOCAL_IP + ':' + baseConfig.dev.port;
    logger.info('Open: ', AUTO_OPEN_URL);
    opn(AUTO_OPEN_URL);
  });
});

gulp.task('serve:prod', () => {
  logger.info('Serve production assets files.');
  const PROD_PORT = baseConfig.dev.port + 1;
  const server = http.createServer((res, req) => {
    return handler(res, req, {
      public: baseConfig.dir.dist.root
    });
  });

  server.listen(PROD_PORT, () => {
    const AUTO_OPEN_URL = 'http://' + LOCAL_IP + ':' + PROD_PORT;
    logger.info('Open: ', AUTO_OPEN_URL);
    opn(AUTO_OPEN_URL);
  });
});
