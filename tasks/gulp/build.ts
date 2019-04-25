import * as gulp from 'gulp';
import * as logger from 'fancy-log';
import * as webpack from 'webpack';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

import pathUtil from '../utils/path-util';

import * as packageJson from '../../package.json';
import webpackProdConfig from '../webpack/webpack.prod';


const baseConfig = packageJson.config.base;

gulp.task('webpack', (done): void => {
  webpack(webpackProdConfig,
    (error, stats): void => {
      logger.info('Webpack build done');
      if (error || stats.hasErrors()) {
        logger.error('Webpack build error:', error);
      }
      stats.toString(webpackProdConfig.stats).split('\n').map((line: string): void => {
        logger.info(line);
      });
      done();
    });
});

gulp.task('build:config', async (done): Promise<void> => {
  const configPath = pathUtil.resolve('') + '/' + 'config.yml';


  const configProcessor = await import('@blog/config-processor');
  const config = configProcessor.default.read(configPath);

  const injectableConfig = {
    site: config.site,
    features: config.features,
    theme: config.build.theme
  };

  mkdirp.sync(pathUtil.resolve(baseConfig.dir.build));
  fs.writeFileSync(pathUtil.resolve(baseConfig.dir.build) + '/' + 'config.json', JSON.stringify(injectableConfig));
  done();
});


gulp.task('build:api', async (done): Promise<void> => {
  const apiGenerator = await import('@blog/api-generator');
  const configProcessor = await import('@blog/config-processor');
  const configPath = pathUtil.resolve('') + '/' + 'config.yml';
  let config = configProcessor.default.read(configPath);

  const mdFilePath = pathUtil.resolve('') + '/' + config.build.directory.posts;
  const distPath = pathUtil.resolve('') + '/' + config.build.directory.public;

  apiGenerator.default.generate(configPath, mdFilePath, distPath).then((): void => {
    done();
  });
});


gulp.task('build', gulp.series('clean', 'build:config', 'build:api', 'webpack'));
