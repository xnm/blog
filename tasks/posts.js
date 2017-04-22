/* Created by Aquariuslt on 2017-03-04.*/
import gulp from 'gulp';
import rename from 'gulp-rename';
import inject from 'gulp-inject-string';
import sequence from 'gulp-sequence';
import _ from 'lodash';
import * as fs from 'fs';

import logger from './util/logger';
import config from './config/base.config';
import * as pathUtil from './util/path-util';
import * as markdownUtil from './util/markdown-util';

/**
 * Post Series Tasks Flow
 * */
gulp.task('posts', sequence(['posts-data'], ['posts-indexes']));

/**
 * Generate Posts Data
 * */
gulp.task('posts-data', function (next) {
  logger.info('Generate Posts:');
  let postDataList = pathUtil.getGlobalPaths(config.input.posts);
  let postList = [];

  _.each(postDataList, function (postUrl) {
    logger.info('Load:', postUrl);
    let post = markdownUtil.parseMarkdown(postUrl);
    postList.push(post);
  });

  postList = postList.sort(function (a, b) {
    return a.created < b.created ? 1 : -1;
  });

  gulp.src(config.emptyFile)
    .pipe(inject.append(JSON.stringify(postList)))
    .pipe(rename(config.output.posts))
    .pipe(gulp.dest(config.build))
    .on('end', function () {
      if (next) {
        next();
      }
    })
  ;
});

/**
 * Generate Indexes
 * Indexes including the metadata
 * Can easily use for generate sitemap ...
 * */

gulp.task('posts-indexes', function () {
  logger.info('Generate Posts Indexes.');
  let postsDataPath = config.build + '/' + config.output.posts;
  let postListString = fs.readFileSync(postsDataPath).toString();
  let postList = JSON.parse(postListString);

  logger.info(`Posts Length:${postList.length}`);


  let indexDataList = [];

  _.each(postList, function (post) {
    indexDataList.push(_.assign(post.metadata, {summary: post.summary}));
  });

  gulp.src(config.emptyFile)
    .pipe(inject.append(JSON.stringify(indexDataList)))
    .pipe(rename(config.output.indexes))
    .pipe(gulp.dest(config.build))
  ;
});
