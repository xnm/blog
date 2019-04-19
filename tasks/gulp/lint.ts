import * as gulp from 'gulp';
import * as eslint from 'gulp-eslint';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import pathUtil from '../utils/path-util';


const TS_FILE_PATTERN = '**/*.ts';

gulp.task('lint', (): void => {
  mkdirp.sync(pathUtil.resolve('') + '/reports/junit/');
  return gulp.src(TS_FILE_PATTERN)
    .pipe(eslint())
    .pipe(eslint.format('junit', (result: string): void => {
      fs.writeFileSync(pathUtil.resolve('') + '/reports/junit/js-lint-results.xml', result);
    }))
    .pipe(eslint.failAfterError())
    ;
});
