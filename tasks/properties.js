/* Created by Aquariuslt on 2017-03-19.*/
import gulp from 'gulp';
import yaml from 'gulp-yaml';

import config from './config/base.config';


gulp.task('properties', function () {
  gulp.src(config.input.properties)
    .pipe(yaml({
      space: 2
    }))
    .pipe(gulp.dest(config.dir.build));
});
