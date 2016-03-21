/** Created by Aquariuslt on 2016-03-16.*/
'use strict';
var config = require('../config/config');
var logger = config.logger;
var path = require('path');
var gulp = require('gulp');
var webpack = require('webpack');
var templates = require('./templates');

var webpackOptions = {
  entry:('./'+config.entry),
  output:{
    path:config.dist,
    filename:config.bundle.script
  }
};

module.exports = gulp.task('webpack',['templates'],function(callback){
  logger.info('[task]:webpack');
  webpack(webpackOptions,function(error,status){
    if(error){
      logger.error('webpack error:',error);
    }
    logger.info('[task]:webpack-end');
    logger.info('[webpack]:',status.toString({}));
    callback();
  });
});