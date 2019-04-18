import * as logger from 'fancy-log';
import * as fs from 'fs';
import * as gulp from 'gulp';
import * as open from 'open';
import * as webpack from 'webpack';
import * as http from 'http';
import * as handler from 'serve-handler';
import * as addEntries from 'webpack-dev-server/lib/utils/addEntries';

import * as WebpackDevServer from 'webpack-dev-server';

import webpackDevConfig from '../webpack/webpack.dev';
import * as packageJson from '../../package.json';

import ipUtil from '../utils/ip-util';
import pathUtil from '../utils/path-util';
import apiGenerator from '@blog/api-generator';
import configProcessor from '@blog/config-processor';

const baseConfig = packageJson.config.base;

const LOCAL_IP = '127.0.0.1';
const LAN_IP = ipUtil.getLanIp();

gulp.task('build:dev-api', (done): void => {
  const configPath = pathUtil.resolve('') + '/' + 'config.yml';
  const config = configProcessor.read(configPath);

  const mdFilePath = pathUtil.resolve('') + '/' + config.build.directory.posts;
  const distPath = pathUtil.resolve('') + '/' + baseConfig.dir.build;

  apiGenerator.generate(configPath, mdFilePath, distPath).then((): void => {
    done();
  });
});


gulp.task('webpack:dev', (): void => {
  logger.info('Webpack building.');
  addEntries(webpackDevConfig, webpackDevConfig.devServer);
  const compilerConfig = webpack(webpackDevConfig);
  new WebpackDevServer(compilerConfig, webpackDevConfig.devServer).listen(webpackDevConfig.devServer.port,
    webpackDevConfig.devServer.host,
    (error): void => {
      if (error) {
        logger.error('Webpack build error:', error);
      }
      const AUTO_OPEN_URL = 'http://' + LOCAL_IP + ':' + baseConfig.dev.port;
      const LAN_URL = 'http://' + LAN_IP + ':' + baseConfig.dev.port;
      logger.info('You can visit at below urls:');
      logger.info('Local: ', AUTO_OPEN_URL);
      logger.info('Network:', LAN_URL);
      open(AUTO_OPEN_URL);
    });
});

gulp.task('serve:prod', (): void => {
  logger.info('Serve production assets files.');
  const PROD_PORT = baseConfig.dev.port + 1;
  const server = http.createServer((res, req): void => {
    return handler(res, req, {
      public: baseConfig.dir.dist.root
    });
  });

  server.listen(PROD_PORT,
    (): void => {
      const AUTO_OPEN_URL = 'http://' + LOCAL_IP + ':' + PROD_PORT;
      const LAN_URL = 'http://' + LAN_IP + ':' + PROD_PORT;
      logger.info('You can visit at below urls:');
      logger.info('Local: ', AUTO_OPEN_URL);
      logger.info('Network:', LAN_URL);
      open(AUTO_OPEN_URL);
    });
});

gulp.task('serve', gulp.series('build:config', 'build:dev-api', 'webpack:dev'));
