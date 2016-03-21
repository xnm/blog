/** Created by Aquariuslt on 2016-03-20.*/
'use strict';

var config = require('../config/config');
var logger = config.logger;
var gulp = require('gulp');
var glob = require('glob');
var path = require('path');
var _ = require('lodash');
var mdIcons = require('material-design-icons');
var mdIconsStaticPath = mdIcons.STATIC_PATH;

module.exports = gulp.task('icons', function () {
  logger.info('[task]:icons');
  glob(mdIconsStaticPath + '/**/svg/production/*.svg',{},function(error,files){
    _.each(files,function(file){
      gulp.src(file)
        .pipe(gulp.dest(config.dist+'/img/icons/'));
    })
  });
  logger.info('[task]:icons-end')
});