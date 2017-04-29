/* Created by Aquariuslt on 16/04/2017.*/
import gulp from 'gulp';
import sequence from 'gulp-sequence';

gulp.task('test', sequence('build:prod'));
