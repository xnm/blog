import * as MarkdownIt from 'markdown-it';
import ContextPlugin from 'markdown-it-context';
import MetadataPlugin from '../lib';

import * as sampleMd from './fixtures/sample.md';

describe('@utils/markdown-it-metadata', () => {

  it('# detect metadata and add parsed metadata at tokens', () => {

    let md = MarkdownIt().use(ContextPlugin).use(MetadataPlugin);

    let tokens = md.parse(sampleMd);

    expect(tokens.context).toHaveProperty('metadata');
    expect(tokens.context.metadata).toHaveProperty('title');
    expect(tokens.context.metadata).toHaveProperty('created');
    expect(tokens.context.metadata).toHaveProperty('updated');
  });


  it('# detect metadata and will not appear in renderer', () => {
    let md = MarkdownIt().use(ContextPlugin).use(MetadataPlugin);

    let html = md.render(sampleMd);

    expect(html).not.toContain('created');
    expect(html).not.toContain('updated');
  });
});
