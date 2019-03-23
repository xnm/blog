import {ArticleProcessor} from '@blog/article-processor/types';

import * as _ from 'lodash';
import * as uslug from 'uslug';
import * as MarkdownIt from 'markdown-it';
import * as anchor from 'markdown-it-anchor';
import ContextPlugin from 'markdown-it-context';
import MetadataPlugin from 'markdown-it-metadata';

const uslugify = (input) => {
  uslug(input)
};

let DEFAULT_OPTIONS = {
  toc: true
};


function createInstance() {
  return MarkdownIt()
    .use(ContextPlugin)
    .use(MetadataPlugin)
    .use(anchor, {
      slugify: uslugify
    });
}


function process(md: string, options?: ArticleProcessor.ProcessOptions): ArticleProcessor.ProcessContext {
  let mergedOptions = _.merge(DEFAULT_OPTIONS, options);

  let markdownIt = createInstance();

  let tokens = markdownIt.parse(md);
  let context = tokens.context;
  let html = markdownIt.renderer.render(md);

  context.md = md;
  context.html = html;

  return context;
}


export default {
  process
};
