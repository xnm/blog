import * as MarkdownIt from 'markdown-it';
import TOCPlugin from '../lib';

import * as sampleMd from './fixtures/sample.md';

describe('@utils/markdown-it-toc', () => {
  it('# should got toc data at env', () => {

    let md = MarkdownIt().use(TOCPlugin);

    let context = {};

    md.parse(sampleMd, context);
    expect(context).toHaveProperty('toc');


  });
});
