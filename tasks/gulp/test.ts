import * as gulp from 'gulp';
import * as jest from 'jest-cli';

gulp.task('test:unit', (done): void => {
  jest.run().then((): void => {
    done();
  });
});

gulp.task('test:e2e', (done): void => {
  done();
});

gulp.task('test:api', (done): void => {
  done();
});

gulp.task('test:ci', (done): void => {
  jest.run(['--coverage']).then((): void => {
    done();
  });
});

gulp.task('test', gulp.series('test:unit', 'test:e2e', 'test:api'));
