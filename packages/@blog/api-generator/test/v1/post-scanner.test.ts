import * as path from 'path';
import postScanner from '../../lib/v1/post-scanner';


describe('@blog/api-generator: post-scanner', () => {

  it('# posts should scan with unix pattern correctly', () => {
    let mdFiles = postScanner.scan(path.resolve(__dirname, './fixtures'));
    expect(mdFiles.length).toBe(2);
  });

  it('# posts should scan with empty result when prefix is invalid', () => {
    let mdFiles = postScanner.scan(path.resolve(__dirname, './hidden'));
    expect(mdFiles.length).toBe(0);
  });
});
