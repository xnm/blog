import * as MarkdownIt from 'markdown-it';
import TOCPlugin from '../lib/toc';

import * as sample from './fixtures/sample-toc.md';

describe('@utils/markdown-it-toc', () => {
  it('# should got toc data at env', () => {

    let md = MarkdownIt().use(TOCPlugin);

    let context = {};

    md.parse(sample, context);
    expect(context).toHaveProperty('toc');


  });
});
