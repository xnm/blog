import parser from '../lib/index';
import scanner from '../lib/scanner';

import * as sample from './__fixtures__/normal.md';
import * as path from 'path';
import * as _ from 'lodash';

describe('@blog/article-processor: parser', (): void => {
  it('# should init posts with scanned file result', (): void => {
    const mdFiles = scanner.scan(path.resolve(__dirname, './__fixtures__'));
    const postFiles = mdFiles.map((postFile): BlogModel.PostFile => parser.init(postFile));

    expect(postFiles.length).toBe(3);
    expect(_.head(postFiles)).toHaveProperty('filename');
    expect(_.head(postFiles)).toHaveProperty('md');
  });

  it('# should `parse` compile markdown string as context but not only html', (): void => {
    const articleContext = parser.parse('sample-article', sample);

    expect(articleContext).toHaveProperty('metadata');
    expect(articleContext).toHaveProperty('md');
    expect(articleContext).toHaveProperty('html');
    expect(articleContext).toHaveProperty('toc');
    expect(articleContext).toHaveProperty('filename');
  });
});
