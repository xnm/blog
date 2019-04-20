import * as path from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';


import persistUtil from '../utils/persist-util';

import postsApi from './posts-api';
import seoApi from './seo-api';

import {scanner as articleScanner} from '@blog/article-processor';
import articleProcessor from '@blog/article-processor';
import configParser from '@blog/config-processor';

/**
 * @param configPath: extra injected config filepath
 * @param dataPath: the base folder to scan posts
 * @param outputPath: the base folder to generate all offline apis
 */
async function generate(configPath: string, dataPath: string, outputPath: string): Promise<void> {
  const config = configParser.read(configPath);
  const mdFiles: string[] = articleScanner.scan(dataPath);
  const posts: BlogModel.Post[] = mdFiles.map((postFile): BlogModel.Post => {
    const filename = path.basename(postFile, '.md');
    const mdContent = fs.readFileSync(postFile).toString();
    return articleProcessor.parse(filename, mdContent);
  });


  const postsApiMap = _.merge({},
    postsApi.generateTagsOverview(posts),
    postsApi.generatePostsQuery(posts),
    postsApi.generatePostsOverview(posts),
    postsApi.generateTagsQuery(posts),
    postsApi.generateCategoriesOverview(posts),
    postsApi.generateCategoriesQuery(posts));

  persistUtil.persist(outputPath, postsApiMap);

  const seoApiMap = _.merge({},
    await seoApi.generateRobotsTxt(config.site),
    seoApi.generateFeedsApi(config.site, posts),
    seoApi.generateSiteMapApi(config.site, posts));

  persistUtil.persist(outputPath, seoApiMap, '');
}


export default {
  generate
};
