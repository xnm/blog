import * as path from 'path';
import * as rimraf from 'rimraf';

import generator from '../../lib/v1/index';


describe('@blog/api-generator:entry', (): void => {

  const TEST_CONFIG_PATH = path.join(__dirname, './__fixtures__/config-sample.yml');
  const TEST_CONFIG_WITH_GALLERY_PATH = path.join(__dirname, './__fixtures__/config-w-gallery.yml');
  const TEST_MD_DIR = path.join(__dirname, './__fixtures__/posts');

  const TMP_BUILD_DIR = path.join(__dirname, '/build/');
  const TMP_DIST_DIR = path.join(__dirname, '/dist/');


  beforeAll((done): void => {
    rimraf(TMP_DIST_DIR, (): void => {
      done();
    });
  });

  it('# should one-step generate all offline-api correctly', async (): Promise<void> => {
    await generator.generate(TEST_CONFIG_PATH, TEST_MD_DIR, TMP_DIST_DIR);
  });

  it('# should generate at other folder eg dev-time correctly', async (): Promise<void> => {
    await generator.generate(TEST_CONFIG_PATH, TEST_MD_DIR, TMP_BUILD_DIR);
  });

  it('# should generate with cover when features.gallery is enable', async (): Promise<void> => {
    await generator.generate(TEST_CONFIG_WITH_GALLERY_PATH, TEST_MD_DIR, TMP_BUILD_DIR);
  });

});
