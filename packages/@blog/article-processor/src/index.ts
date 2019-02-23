import {ArticleProcessor} from '@blog/article-processor/types';

import * as _ from 'lodash';
import * as uslug from 'uslug';
import * as MarkdownIt from 'markdown-it';
import * as anchor from 'markdown-it-anchor';

import toc from './plugins/toc';

const uslugify = (input) => {
  uslug(input)
};

let DEFAULT_OPTIONS = {
  toc: false
};


function createInstance(context: ArticleProcessor.ProcessContext, options: ArticleProcessor.ProcessOptions) {
  let markdownIt = MarkdownIt()
    .use(anchor, {
      slugify: uslugify
    })
  ;

  if (options.toc) {
    markdownIt.use(toc, {context})
  }

  return markdownIt;
}


function process(md: string, options?: ArticleProcessor.ProcessOptions): ArticleProcessor.ProcessContext {
  let context: ArticleProcessor.ProcessContext = {};
  let mergedOptions = _.merge(DEFAULT_OPTIONS, options);


  let markdownIt = createInstance(context, mergedOptions);

  let html = markdownIt.render(md);

  context.md = md;
  context.html = html;

  return context;
}


export default {
  process
};
