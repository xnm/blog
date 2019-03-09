import * as MarkdownIt from 'markdown-it';
import ContextPlugin from '../src/index';

describe('markdown-it-context:initialize', () => {
  it('# create context and get in tokens', () => {
    let md = MarkdownIt().use(ContextPlugin);

    let tokensWithContext = md.parse(`
    # title
    ## sub title
    `);

    expect(tokensWithContext).toHaveProperty('context');
    expect(tokensWithContext.context).toEqual({});

  });

});

