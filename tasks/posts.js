/* Created by Aquariuslt on 4/27/17.*/
import _ from 'lodash';
import fs from 'fs';
import mkdirp from 'mkdirp';
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


gulp.task('posts', sequence(['posts-content'], ['posts-indexes']));


gulp.task('posts-content', function () {
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


  mkdirp.sync(pathUtil.root(config.dir.build) + '/' + config.output.post);
  _.each(postDataList, (postData) => {
    logger.info('Generating Post:', postData.metadata.filename);
    fs.writeFileSync(pathUtil.root(config.dir.build) + '/' + config.output.post + '/' + postData.metadata.filename + '.json', JSON.stringify(postData));
  });
  logger.info('Generate Posts Done.');
});

gulp.task('posts-indexes', function (next) {
  logger.info('Generate Indexes');
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
    .pipe(gulp.dest(config.dir.build))
    .on('end', next);
  logger.info('Generate Indexes Done.');

});
