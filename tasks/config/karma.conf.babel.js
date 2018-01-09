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
    customLaunchers: {
      ChromiumHeadlessNoSandbox: {
        base: 'ChromiumHeadless',
        flags: ['--no-sandbox']
      }
    },
    browsers: [
      'ChromiumHeadlessNoSandbox'
    ],
    frameworks: [
      'mocha',
      'sinon',
      'chai'
    ],
    reporters: [
      'spec',
      'coverage'
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
    coverageReporter: {
      dir: pathUtil.resolve(baseConfig.dir.test.unit) + '/coverage',
      reporters: [
        {type: 'html', subdir: 'report-html'},
        {type: 'lcovonly', subdir: '.'},
        {type: 'text-summary'}
      ]
    }
  });
};

export default karmaConfig;
