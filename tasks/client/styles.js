'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var config = require('../config');



module.exports = gulp.task('styles', function () {
  return gulp.src(config.paths.src.styles)
    .pipe(concat('bundledCssFile'))
    .pipe(autoprefixer('last 1 version'))
    .pipe(gulpif(process.env.NODE_ENV=='release', rename(config.filenames.release.styles), rename(config.filenames.build.styles)))
    .pipe(gulpif(process.env.NODE_ENV=='release', gulp.dest(config.paths.dest.release.styles), gulp.dest(config.paths.dest.build.styles)));
});

//.pipe(gulpif(process.env.NODE_ENV=='release', minifyCss(),minifyCss()))