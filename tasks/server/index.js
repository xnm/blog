/** Created by Aquariuslt on 2015-11-20.*/
'use strict';
var gulp = require('gulp');
var runSequence = require('run-sequence');
var index = require('../client/index');
var assets = require('../client/assets');
var browserify = require('../client/browserify');
var fonts = require('../client/fonts');
var clean = require('../client/clean');
var images =require('../client/images');
var minify = require('../client/minify');
var styles = require('../client/styles');
var templates = require('../client/templates');
var watchify =require('../client/watchify');
var webpack = require('../client/webpack');
var watch = require('../client/webpack-watch');
var server =require('./server');


function start(){
  if (process.env.NODE_ENV=='release') {
    runSequence(
      'clean',
      ['index', 'styles', 'images', 'fonts', 'assets', 'templates'],
      'webpack',
      'minify',
      'server'
    );
  }
  else {
    runSequence(
      'clean',
      ['index', 'styles', 'images', 'fonts', 'assets', 'templates'],
      ['webpack','webpack-watch'],
      'server'
    );
  }
}

module.exports.start = start;