/* Created by Aquariuslt on 2017-03-23.*/
import gulp from 'gulp';
import rename from 'gulp-rename';
import inject from 'gulp-inject-string';
import sequence from 'gulp-sequence';
import config from './config/base.config';
import fs from 'fs';
import swPrecache from 'sw-precache';

const MANIFEST_WEBAPP = 'manifest.webapp';

gulp.task('pwa', sequence(['generate-404', 'service-worker', 'spa']));

gulp.task('generate-404', function () {
  let applicationPropertiesPath = config.dir.build + '/' + config.output.application;
  let applicationPropertiesString = fs.readFileSync(applicationPropertiesPath).toString();
  let applicationProperties = JSON.parse(applicationPropertiesString);

  let baseManifest = JSON.parse(fs.readFileSync(config.input.manifest).toString());

  let pwaOptions = applicationProperties.blog.pwa;

  if (pwaOptions.enable) {
    baseManifest.name = pwaOptions.name;
    baseManifest.short_name = pwaOptions.shortName;
    baseManifest.description = pwaOptions.description;
    baseManifest.developer = {
      name: pwaOptions.developer.name,
      url: pwaOptions.developer.url
    };

    gulp.src(config.input.empty)
      .pipe(inject.append(JSON.stringify(baseManifest)))
      .pipe(rename(MANIFEST_WEBAPP))
      .pipe(gulp.dest(config.dir.build));
  }

});

gulp.task('service-worker', function () {
  swPrecache.write(config.dir.dist + '/' + config.output.serviceWorker, {
    staticFileGlobs: [config.dir.dist + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
    stripPrefix: config.dir.dist
  });

});

gulp.task('spa', function (next) {
  gulp.src(config.dir.dist + '/index.html')
    .pipe(rename('404.html'))
    .pipe(gulp.dest(config.dir.dist))
    .on('end', function () {
      if (next) {
        next();
      }
    });
});
