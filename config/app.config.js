/**
 * Application level config wrapper from application.yml
 * */
import fs from 'fs';
import yaml from 'js-yaml';

import pathUtil from './utils/path-util';

const APPLICATION_YML = 'application.yml';

let appConfig = yaml.safeLoad(fs.readFileSync(pathUtil.resolve(APPLICATION_YML)));

export default appConfig;

