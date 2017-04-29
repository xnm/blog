/* Created by Aquariuslt on 4/27/17.*/
import _ from 'lodash';
import gulp from 'gulp';
import sequence from 'gulp-sequence';
import inject from 'gulp-inject-string';
import rename from 'gulp-rename';

import config from './config/base.config';

import logger from './util/logger';
import pathUtil from './util/path-util';
import mdUtil from './util/md-util';


const RENDER_TOKENS_OPTIONS = {
  highlight: true
};


gulp.task('posts', sequence(['tokens']));


gulp.task('tokens', function () {
  logger.info('Generate Posts');
  let postDataPathList = pathUtil.getGlobalPaths(config.input.posts);
  let metadataList = [];
  let postDataList = [];

  _.each(postDataPathList, (postDataPath) => {
    let {metadata, bodyTokens} = mdUtil.readMarkdownTokens(postDataPath);
    let {catalogue, summary, html} = mdUtil.readBodyTokens(bodyTokens, RENDER_TOKENS_OPTIONS);

    let combinedMetadata = _.clone(metadata);
    combinedMetadata.summary = summary;

    let postData = {
      metadata: metadata,
      catalogue: catalogue,
      html: html
    };

    metadataList.push(combinedMetadata);
    postDataList.push(postData);
  });

  metadataList = _.reverse(_.sortBy(metadataList, 'created'));


  gulp.src(config.input.empty)
    .pipe(inject.append(JSON.stringify(metadataList)))
    .pipe(rename(config.output.indexes))
    .pipe(gulp.dest(config.dir.build));
  logger.info('Generate Indexes Done.');

  _.each(postDataList, (postData) => {
    gulp.src(config.input.empty)
      .pipe(inject.append(JSON.stringify(postData)))
      .pipe(rename(config.output.post + '/' + postData.metadata.filename + '.json'))
      .pipe(gulp.dest(config.dir.build));
  });
  logger.info('Generate Posts Done.')

});


