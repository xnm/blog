import * as MarkdownIt from 'markdown-it';
import TOCPlugin from '../lib/toc';

import * as sample from './fixtures/sample-toc.md';

describe('@utils/markdown-it-toc', (): void => {
  it('# should got toc data at env', (): void => {
    const md = MarkdownIt().use(TOCPlugin);

    const context = {};

    md.parse(sample, context);
    expect(context).toHaveProperty('toc');
  });
});
