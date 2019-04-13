import * as gulp from 'gulp';
import * as eslint from 'gulp-eslint';

const TS_FILE_PATTERN = '**/*.ts';

gulp.task('lint', (): void => {
  return gulp.src(TS_FILE_PATTERN)
    .pipe(eslint())
    .pipe(eslint.failAfterError())
    ;
});
