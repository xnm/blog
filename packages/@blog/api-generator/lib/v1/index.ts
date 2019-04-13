import * as path from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';


import persistUtil from '../utils/persist-util';

import postsApi from './posts-api';
import seoApi from './seo-api';

import articleProcessor from '@blog/article-processor/lib/index';
import articleScanner from '@blog/article-processor/lib/scanner';


/**
 * @param config: extra injected config
 * @param dataPath: the base folder to scan posts
 * @param outputPath: the base folder to generate all offline apis
 */
async function generate(config: Config.Site, dataPath: string, outputPath: string): Promise<void> {
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
    await seoApi.generateRobotsTxt(config, posts),
    seoApi.generateFeedsApi(config, posts),
    seoApi.generateSiteMapApi(config, posts));

  persistUtil.persist(outputPath, seoApiMap, '');
}


export default {
  generate
};
