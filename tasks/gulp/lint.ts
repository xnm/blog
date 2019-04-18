import * as gulp from 'gulp';
import * as eslint from 'gulp-eslint';
import * as fs from 'fs';

const TS_FILE_PATTERN = '**/*.ts';

gulp.task('lint', (): void => {
  return gulp.src(TS_FILE_PATTERN)
    .pipe(eslint())
    .pipe(eslint.format('junit', (result: string): void => {
      fs.writeFileSync('reports/junit/js-lint-results.xml', result);
    }))
    .pipe(eslint.failAfterError())
    ;
});
