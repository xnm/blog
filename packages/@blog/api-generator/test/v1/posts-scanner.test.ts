import * as path from 'path';
import postScanner from '@blog/api-generator/lib/v1/posts-scanner';


describe('@blog/api-generator: post-scanner', () => {

  it('# posts should scan with unix pattern correctly', () => {
    const mdFiles = postScanner.scan(path.resolve(__dirname, './fixtures'));
    expect(mdFiles.length).toBe(2);
  });

  it('# posts should scan with empty result when prefix is invalid', () => {
    const mdFiles = postScanner.scan(path.resolve(__dirname, './hidden'));
    expect(mdFiles.length).toBe(0);
  });
});
