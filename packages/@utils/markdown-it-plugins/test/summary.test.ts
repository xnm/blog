import * as MarkdownIt from 'markdown-it';
import SummaryPlugin from '../lib/summary';

import * as sample from './fixtures/sample-summary.md';


describe('@utils/markdown-it-summary', () => {
  it('# should got summary with 100 chars without any options', () => {
    const md = MarkdownIt().use(SummaryPlugin);
    const context = {};

    md.parse(sample, context);
    expect(context).toHaveProperty('summary');
    expect(context['summary'].length).toBeLessThanOrEqual(100);

  });

  it('# should got summary with spec chars with options.len', () => {
    const options = {
      len: 50
    };
    const md = MarkdownIt().use(SummaryPlugin, options);
    const context = {};

    md.parse(sample, context);
    expect(context).toHaveProperty('summary');
    expect(context['summary'].length).toBeLessThanOrEqual(options.len);

  });
});
