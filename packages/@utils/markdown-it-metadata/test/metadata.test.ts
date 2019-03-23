import * as MarkdownIt from 'markdown-it';
import MetadataPlugin from '../lib';

import * as sampleMd from './fixtures/sample.md';

describe('@utils/markdown-it-metadata', () => {

  it('# detect metadata and add parsed metadata at tokens', () => {

    let md = MarkdownIt().use(MetadataPlugin);

    let context = {};
    md.parse(sampleMd, context);

    expect(context).toHaveProperty('metadata');
    expect(context['metadata']).toHaveProperty('title');
    expect(context['metadata']).toHaveProperty('created');
    expect(context['metadata']).toHaveProperty('updated');
  });


  it('# detect metadata and will not appear in renderer', () => {
    let md = MarkdownIt().use(MetadataPlugin);

    let context = {};
    let html = md.render(sampleMd, context);

    expect(html).not.toContain('created');
    expect(html).not.toContain('updated');
  });
});
