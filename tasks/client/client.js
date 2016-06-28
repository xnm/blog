/** Created by Aquariuslt on 2016-03-16.*/
'use strict';

var config = require('../config/config');
var logger = config.logger;
var runSequence = require('run-sequence');


var index = require('./index');
var styles = require('./styles');
var webpack = require('./webpack');
var watch = require('./webpack-watch');
var stat = require('./static');
var minify = require('./minify');
var articles = require('./articles');

module.exports.start = start;

function start(){
  logger.info('[task]:client');
  if(process.env.NODE_ENV === 'release'){
    runSequence(
      ['compile-articles'],
      ['index','styles'],
      ['webpack'],
      'minify',
      'stat'
    );
  }
  else{
    runSequence(
      ['compile-articles'],
      ['index','styles'],
      ['webpack','watch'],
      'stat'
    );
  }
}