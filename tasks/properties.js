/* Created by Aquariuslt on 2017-03-19.*/
import gulp from 'gulp';
import rename from 'gulp-rename';
import yaml from 'gulp-yaml';

import config from './config/base.config';


gulp.task('properties', function (next) {
  gulp.src(config.input.properties)
    .pipe(yaml({
      space: 2
    }))
    .pipe(rename(config.output.application))
    .pipe(gulp.dest(config.dir.build))
    .on('end', next);
});
