import * as MarkdownIt from 'markdown-it';
import ContextPlugin from '../src/index';

describe('markdown-it-context:initialize', () => {
  it('# should create context', () => {
    let md = MarkdownIt().use(ContextPlugin);

    let tokensWithContext = md.parse(`# title`);
    let html = md.renderer.render(tokensWithContext);

    expect(tokensWithContext).toHaveProperty('context');
    expect(tokensWithContext.context).toEqual({});
    expect(html).toEqual('<h1>title</h1>' + '\n');

  })
});

