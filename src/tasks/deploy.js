/* Created by Aquariuslt on 2017-03-05.*/
import gulp from "gulp";
import rename from "gulp-rename";
import ghpages  from "gh-pages";
import logger from "./util/logger";
import config from "./config/gulp.config";

gulp.task('sap', function (next) {
  gulp.src(config.distDir + '/index.html')
    .pipe(rename('404.html'))
    .pipe(gulp.dest(config.distDir))
    .on('end', function () {
      if (next) {
        next();
      }
    });
});

gulp.task('upload', ['sap'], function (next) {
  let deployOptions = config.deployOptions;
  logger.info('Pushing into:', deployOptions.repo);

  ghpages.publish(config.distDir,config.deployOptions,function(err){
    if(err){
      logger.error('Publish Error:',err);
    }

    logger.info('Publish End');
    if(next){
      next();
    }
  });

});

