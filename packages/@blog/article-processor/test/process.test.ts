import processor from '../src/index';

import * as normal from './fixtures/input/normal.md';

import * as uslug from 'uslug';
import * as MarkdownIt from 'markdown-it';
import * as anchor from 'markdown-it-anchor';


const uslugify = (input) => {
  uslug(input)
};


describe('@blog/article-processor', () => {

  it('# process process options', (done) => {
    processor.process('');
    done();
  });


  it('# process normal markdown source', (done) => {
    function toc(md, options) {
      let cotext = options.context;

      console.log('applying header token to context:');
    }

    let markdownIt = MarkdownIt()
      .use(anchor, {
        slugify: uslugify
      })
    ;

    let context = {};
    markdownIt.use(toc, {context});

    done();
  })
});
