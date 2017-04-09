'use strict';
var Browserify = require('browserify');
var gulp = require('gulp');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var config = require('../config');
var winston = require('winston');
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({'timestamp':true})
  ]
});

module.exports = gulp.task('watchify', function () {
  var bundler = new Browserify({
    entries: [config.paths.src.modules],
    cache:{},
    plugin:[watchify]
  });


  bundler.on('update', rebundle);
  function rebundle() {
    logger.info('file change,update bundle.');
    return bundler.bundle()
      .pipe(source(config.filenames.build.scripts))
      .pipe(gulp.dest(config.paths.dest.build.scripts));
  }

  return rebundle();
});
