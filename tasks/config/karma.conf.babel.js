import baseConfig from './base.config';
import webpackTestConfig from './webpack.test.babel';
import pathUtil from '../utils/path-util';

import puppeteerPkg from 'puppeteer/package.json';
import Downloader from 'puppeteer/utils/ChromiumDownloader';

const ChromiumRevision = puppeteerPkg['puppeteer']['chromium_revision'];
const revisionInfo = Downloader.revisionInfo(Downloader.currentPlatform(), ChromiumRevision);
process.env.CHROMIUM_BIN = revisionInfo.executablePath;

let karmaConfig = function(config) {
  config.set({
    browsers: [
      'ChromiumHeadless'
    ],
    frameworks: [
      'mocha',
      'sinon',
      'chai'
    ],
    reporters: [
      'spec',
      'coverage-istanbul'
    ],
    files: [
      pathUtil.resolve(baseConfig.dir.test.unit) + '/specs/**/*.spec.js'
    ],
    preprocessors: {
      '/**/*.spec.js': ['webpack', 'sourcemap']
    },
    webpack: webpackTestConfig,
    webpackMiddleware: {
      noInfo: true
    },
    client: {
      captureConsole: false
    },
    coverageIstanbulReporter: {
      dir: pathUtil.resolve('test/unit') + '/coverage',
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: true,
      thresholds: {
        emitWarning: false,
        global: {
          statements: 1,
          lines: 1,
          branches: 1,
          functions: 1
        }
      }
    }
  });
};

export default karmaConfig;
