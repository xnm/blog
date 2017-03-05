/* Created by Aquariuslt on 2017-03-05.*/
import gulp from "gulp";
import ghPages from 'gulp-gh-pages';
import logger from "./util/logger";
import config from "./config/gulp.config";



gulp.task('upload',function(){
  let deployOptions = config.deployOptions;
  logger.info('Pushing into:',deployOptions.remoteUrl);
  gulp.src(config.distDir + '/**/*')
    .pipe(ghPages(deployOptions));
  logger.info('Push end');
});