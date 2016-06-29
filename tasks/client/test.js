/**Created by CUIJA on 2016-06-29.*/
/** Created by Aquariuslt on 2016-03-16.*/
'use strict';

var config = require('../config/config');
var logger = config.logger;
var runSequence = require('run-sequence');

var gulp = require('gulp');

var index = require('./index');
var styles = require('./styles');
var webpack = require('./webpack');
var watch = require('./webpack-watch');
var minify = require('./minify');
var articles = require('./articles');
var variables = require('./variables');



gulp.task('test',function(){
  logger.info('[task]:client');
  if(process.env.NODE_ENV === 'release'){
    runSequence(
      ['compile-articles','export-variables'],
      ['index','styles'],
      ['webpack'],
      'minify'
    );
  }
  else{
    runSequence(
      ['compile-articles','export-variables'],
      ['index','styles'],
      ['webpack']
    );
  }
  logger.info('[task]:end');
});