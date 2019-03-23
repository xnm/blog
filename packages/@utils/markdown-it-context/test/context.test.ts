import * as yaml from 'js-yaml';

import * as MarkdownIt from 'markdown-it';
import ContextPlugin from '../lib';


import * as sampleMd from './fixtures/sample.md';


describe('@utils/markdown-it-context:initialize', () => {
  it('# create context and get in tokens', () => {
    let md = MarkdownIt().use(ContextPlugin);

    let tokensWithContext = md.parse(sampleMd);

    expect(tokensWithContext).toHaveProperty('context');
    expect(tokensWithContext.context).toEqual({});

  });


  it('# cut tokens and update contexts', () => {

    let MetadataContextPlugin = (md) => {

      const METADATA_RE = new RegExp('```metadata([\\s\\S]*)```');

      function parseMetadata(meta: String) {
        return yaml.load(meta, 'utf-8');
      }

      md.block.ruler.before(
        'fence',
        'metadata',
        function detectMetadata(state, startLine, endLine) {
          let startPos = state.bMarks[startLine] + state.tShift[startLine];
          let maxPos = state.eMarks[endLine];
          const block = state.src.slice(startPos, maxPos);


          const matches = METADATA_RE.exec(block);

          if (!matches) {
            return false;
          }

          state.src = state.src.replace(METADATA_RE, '');
          state.tokens.context.metadata = parseMetadata(matches[1]);


          return true;

        },
        {
          alt: [
            ''
          ]
        }
      );

      return false;
    };


    let mdo = MarkdownIt();
    let md = MarkdownIt()
      .use(ContextPlugin)
      .use(MetadataContextPlugin)
    ;


    let tokensWoContext = mdo.parse(sampleMd);
    let tokensWContext = md.parse(sampleMd);

    expect(tokensWContext == tokensWoContext).toBeFalsy();
    expect(tokensWContext).toHaveProperty('context');
    expect(tokensWContext.context).toHaveProperty('metadata');

    expect(tokensWContext.context.metadata).toHaveProperty('title');
    expect(tokensWContext.context.metadata).toHaveProperty('created');
    expect(tokensWContext.context.metadata).toHaveProperty('updated');

  });

});

