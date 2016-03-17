/** Created by Aquariuslt on 2016-03-16.*/
'use strict';
var config = require('../config/config');
var logger = config.logger;
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

/**
 * As I don't know a better way to bundle css file
 * with internal image,fonts,and other resources with it.
 * So just bundle plain css file.
 * */
module.exports = gulp.task('styles',function(){
  logger.info('[task]:styles');
  var stylePaths = config.src + '/client/**/styles/*.css';
  gulp.src(stylePaths)
    .pipe(concat('bundledCssFile'))
    .pipe(rename(config.bundle.style))
    .pipe(gulp.dest(config.dist));
});