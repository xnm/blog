/** Created by Aquariuslt on 2016-03-16.*/
'use strict';
var config = require('../config/config');
var logger = config.logger;
var path = require('path');
var gulp = require('gulp');
var webpack = require('webpack-stream');

module.exports = gulp.task('watch',function(){
  logger.info('[task]:watch');
  function reload(event){
    logger.info('[watch]:'+event.path+' change.updating..');
  }

  var scriptWatcher = gulp.watch(config.src+'/client/**/*.js',['webpack']);
  var stylesWatcher = gulp.watch(config.src+'/client/**/styles/*.css',['styles']);

  scriptWatcher.on('change',reload);
  stylesWatcher.on('change',reload);
});