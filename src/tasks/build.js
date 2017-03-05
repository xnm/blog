/* Created by Aquariuslt on 2017-03-04.*/
import gulp from "gulp";
import logger from "./util/logger";
import config from "./config/gulp.config";
import "./cname";
import "./clean";

gulp.task('build', ['posts']);

gulp.task('build:prod', ['posts', 'cname'], function () {
  logger.info('Moving build dir files into dist folder');
  gulp.src(config.buildDir + '/*')
    .pipe(gulp.dest(config.distDir));
  logger.info('Move done');
});
