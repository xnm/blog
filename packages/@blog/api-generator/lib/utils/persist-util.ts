import * as _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

const DEFAULT_EXTENSIONS = '.json';

/**
 * @desc should persist data as type with compression
 * @param folder: the folder to build data, usually ${PROJECT_DIR}/dist
 * @param data: key-value object, the key is path suffix, value is content
 * @param extension: file extension, default is `.json`,
 *        considering `.xml`(sitemap.xml, feeds.xml),`.txt`(robots.txt)
 */
function persist(folder: string, data: object, extension = DEFAULT_EXTENSIONS): void {
  _.each(_.keys(data), (suffix: string): void => {
    const targetFile = folder + suffix + extension;
    mkdirp.sync(path.dirname(targetFile));
    fs.writeFileSync(folder + suffix + extension,
      extension === DEFAULT_EXTENSIONS ? JSON.stringify(data[suffix]) : data[suffix]);
  });
}

export default {
  persist
};
