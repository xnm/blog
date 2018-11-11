import gulp from 'gulp';
import sequence from 'gulp-sequence';
import jest from 'jest';

gulp.task('test:unit', (done) => {
  process.env.BABEL_ENV = 'test';
  const jestCliConfig = {
    coverage: true
  };
  jest.runCLI(jestCliConfig, ['.']).then(async () => {
    done();
  });
});

gulp.task('test:e2e', () => {

});

gulp.task('test:api', () => {

});

gulp.task('test', sequence(
  ['test:unit'],
  ['test:e2e'],
  ['test:api']
));

