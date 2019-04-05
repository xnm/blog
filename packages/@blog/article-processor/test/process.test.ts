import processor from '../src/index';

import * as normalMd from './fixtures/normal.md';


describe('@blog/article-processor', () => {

  it('# should `process` compile markdown string as context but not only html', () => {

    const articleContext = processor.process(normalMd);

    expect(articleContext).toHaveProperty('metadata');
    expect(articleContext).toHaveProperty('md');
    expect(articleContext).toHaveProperty('html');
    expect(articleContext).toHaveProperty('toc');
  });
});
