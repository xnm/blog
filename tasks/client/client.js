/** Created by Aquariuslt on 2016-03-16.*/
'use strict';

var config = require('../config/config');
var logger = config.logger;
var gulp = require('gulp');
var runSequence = require('run-sequence');


var clean = require('./clean');
var index = require('./index');
var webpack = require('./webpack');

module.exports.start = start;

function start(){
  logger.info('[task]:client');
  runSequence(
    //['clean'],
    ['index'],
    'webpack'
  );
}