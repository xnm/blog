/**Created by CUIJA on 2016-06-29.*/

var runSequence = require('run-sequence');
var gulp = require('gulp');

var client = require('./tasks/client/client');
var test = require('./tasks/client/test');



gulp.task('default',function(){
  runSequence('client');
});


gulp.task('env:test',function(){
  runSequence('test');
});

