import * as MarkdownIt from 'markdown-it';
import SummaryPlugin from '../lib/summary';

import * as sample from './__fixtures__/sample-summary.md';

describe('@utils/markdown-it-summary', (): void => {
  it('# should got summary with 100 chars without any options', (): void => {
    const md = MarkdownIt().use(SummaryPlugin);
    const context = {};

    md.parse(sample, context);
    expect(context).toHaveProperty('summary');
    expect(context['summary'].length).toBeLessThanOrEqual(100);
  });

  it('# should got summary with spec chars with options.len', (): void => {
    const options = {
      len: 50
    };
    const md = MarkdownIt().use(SummaryPlugin, options);
    const context = {};

    md.parse(sample, context);
    expect(context).toHaveProperty('summary');
    expect(context['summary'].length).toBeLessThanOrEqual(options.len);
  });

  it('# should got no summary when no context', (): void => {
    const md = MarkdownIt().use(SummaryPlugin);
    md.parse(sample);
  });
});
