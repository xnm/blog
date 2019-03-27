import * as gulp from 'gulp';
import * as jest from 'jest-cli';

gulp.task('test:unit', (done) => {
  jest.run().then(()=>{
    done();
  });
});

gulp.task('test:e2e', (done) => {
  done();
});

gulp.task('test:api', (done) => {
  done();
});


gulp.task('test:ci', (done) => {
  jest.run(
    ['--coverage']
  ).then(()=>{
    done();
  });
});

gulp.task('test', gulp.series(
  'test:unit', 'test:e2e', 'test:api'
));
