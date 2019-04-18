import * as gulp from 'gulp';

gulp.task('ci', gulp.series('test:ci', 'build'));
