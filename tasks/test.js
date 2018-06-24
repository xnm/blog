import gulp from 'gulp';
import sequence from 'gulp-sequence';
import jest from 'jest';
import {Server} from 'karma';

import jestConfig from './config/jest.config';
import pathUtil from './utils/path-util';

gulp.task('test:unit', function(done) {
  process.env.BABEL_ENV = 'test';
  new Server({
    configFile: pathUtil.resolve('tasks/config') + '/karma.conf.babel.js',
    singleRun: true
  }, done).start();
});

gulp.task('test:e2e', function() {

});

gulp.task('test:api', function() {

});

gulp.task('test', sequence(['test:unit'], ['test:e2e'], ['test:api']));

gulp.task('jest', function(done) {
  process.env.BABEL_ENV = 'test';
  jest.runCLI(jestConfig, ['.']).then(async () => {
    done();
  });
});
