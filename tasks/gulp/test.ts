import * as gulp from 'gulp';


gulp.task('test:unit', (done) => {
  done();
});

gulp.task('test:e2e', () => {

});

gulp.task('test:api', () => {

});

gulp.task('test', gulp.series(
  'test:unit', 'test:e2e', 'test:api'
));

