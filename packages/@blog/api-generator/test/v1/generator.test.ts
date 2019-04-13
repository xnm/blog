import * as path from 'path';
import * as rimraf from 'rimraf';

import generator from '../../lib/v1/index';

import * as config from '../v1/fixtures/json/config-sample.json';

describe('@blog/api-generator:entry', (): void => {

  const TMP_MD_DIR = path.join(__dirname, './fixtures');
  const TMP_BUILD_DIR = path.join(__dirname, '/build/');
  const TMP_DIST_DIR = path.join(__dirname, '/dist/');


  beforeAll((done): void => {
    rimraf(TMP_DIST_DIR, (): void => {
      done();
    });
  });

  it('# should one-step generate all offline-api correctly', async (): Promise<void> => {
    await generator.generate(config, TMP_MD_DIR, TMP_DIST_DIR);
  });

  it('# should generate at other folder eg dev-time correctly', async (): Promise<void> => {
    await generator.generate(config, TMP_MD_DIR, TMP_BUILD_DIR);
  });

});
