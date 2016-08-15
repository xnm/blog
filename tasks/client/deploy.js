/** Created by Aquariuslt on 08-15-2016.*/
'use strict';

var config = require('../config/config');
var logger = config.logger;
var siteConfig = require('../config/siteConfig');

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');


gulp.task('deploy', function () {
  var deployOptions = siteConfig.deployOptions;
  logger.info('[task]:deploy:', deployOptions.remoteUrl);
  gulp.src(config.dest)
    .pipe(ghPages(deployOptions));
});