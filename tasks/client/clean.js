/** Created by Aquariuslt on 2016-03-16.*/
'use strict';
var config = require('../config/config');
var logger = config.logger;
var gulp = require('gulp');
var rimraf = require('gulp-rimraf');


/**
 * @description rimraf use to delete a folder/files,
 * we use it to clear 'dist' folder
 * like maven command 'mvn clean'
 * */
module.exports = gulp.task('clean',function(){
  logger.info('[task]:clean');
  gulp.src(config.dist,{read:false}).pipe(rimraf());
  logger.info('[task]:clean-end');
});

