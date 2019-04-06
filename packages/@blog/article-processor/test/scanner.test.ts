import * as path from 'path';
import scanner from '../lib/scanner';


describe('@blog/article-parser: scanner', () => {

  it('# posts should scan with unix pattern correctly', () => {
    const mdFiles = scanner.scan(path.resolve(__dirname, './fixtures'));
    expect(mdFiles.length).toBe(3);
  });

  it('# posts should scan with empty result when prefix is invalid', () => {
    const mdFiles = scanner.scan(path.resolve(__dirname, './fixtures/hidden'));
    expect(mdFiles.length).toBe(0);
  });
});
