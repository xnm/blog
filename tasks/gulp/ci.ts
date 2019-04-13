import * as gulp from 'gulp';

gulp.task('ci', gulp.series('build', 'test:ci'));
