import gulp from "gulp";
import winston from "winston";
import moment from "moment";
import rimraf from 'gulp-rimraf';

let logger = new (winston.Logger)({
  level: 'debug',
  transports: [
    new (winston.transports.Console)({
      formatter: function (options) {
        return '[' + moment().format('HH:mm:ss') + '] '
          + options.message;
      }
    })
  ]
});


gulp.task('default', ['clean','gen-posts']);

gulp.task('clean',function(){
  logger.info('Deleting dist folder');
  gulp.src('./dist')
    .pipe(rimraf());
});

gulp.task('gen-posts',function(){
  logger.info('Generating posts');
  gulp.src('./src/data/posts/**/*.md')
    .pipe(gulp.dest('./dist/data'));
});

gulp.task('deploy',function(){

});

gulp.task('cname',function(){

});