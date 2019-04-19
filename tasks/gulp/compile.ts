import * as gulp from 'gulp';
import * as cp from 'child_process';
import * as logger from 'fancy-log';

import pathUtil from '../utils/path-util';

gulp.task('compile', (done): void => {
  cp.exec('lerna run tsc', {
    cwd: pathUtil.resolve('')
  }, (error, stdout): void => {
    if (error) {
      logger.error(error);
    }

    stdout.split('\n').map((line: string): void => {
      logger.info(line);
    });

    done();
  });

});
