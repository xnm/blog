import * as path from 'path';
import scanner from '../lib/scanner';

describe('@blog/article-parser: scanner', ():void => {
  it('# posts should scan with unix pattern correctly', ():void => {
    const mdFiles = scanner.scan(path.resolve(__dirname, './__fixtures__'));
    expect(mdFiles.length).toBe(3);
  });

  it('# posts should scan with empty result when prefix is invalid', ():void => {
    const mdFiles = scanner.scan(path.resolve(__dirname, './__fixtures__/hidden'));
    expect(mdFiles.length).toBe(0);
  });
});
