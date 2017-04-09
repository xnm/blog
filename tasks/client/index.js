'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var replace = require('gulp-replace');
var htmlmin = require('gulp-htmlmin');
var config = require('../config');

module.exports = gulp.task('index', function () {


  return gulp.src(config.paths.src.index)
    .pipe(gulpif(process.env.NODE_ENV=='release', htmlmin({comments: true, empty: true, spare: true, quotes: true})))
    .pipe(gulpif(process.env.NODE_ENV=='release',
      replace('<!--styles-->', '<link href="' + config.filenames.release.styles + '" rel="stylesheet">'),
      replace('<!--styles-->', '<link href="' + config.filenames.build.styles + '" rel="stylesheet">')
    ))
    .pipe(gulpif(process.env.NODE_ENV=='release',
      replace('<!--scripts-->', '<script src="' + config.filenames.release.scripts + '"></script>'),
      replace('<!--scripts-->', '<script src="' + config.filenames.build.scripts + '"></script>')
    ))
    .pipe(gulpif(process.env.NODE_ENV=='release',
      gulp.dest(config.paths.dest.release.index),
      gulp.dest(config.paths.dest.build.index)));
    });
