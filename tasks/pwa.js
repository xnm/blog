/* Created by Aquariuslt on 2017-03-23.*/
import gulp from 'gulp';
import rename from 'gulp-rename';
import inject from 'gulp-inject-string';
import config from './config/base.config';
import fs from 'fs';

const MANIFEST_WEBAPP = 'manifest.webapp';

gulp.task('pwa', function () {
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
