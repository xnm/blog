import {ArticleProcessor} from '@blog/article-processor/types';

import * as _ from 'lodash';
import * as uslug from 'uslug';
import * as MarkdownIt from 'markdown-it';
import * as AnchorPlugin from 'markdown-it-anchor';
import MetadataPlugin from '@utils/markdown-it-metadata';
import TOCPlugin from '@utils/markdown-it-toc';

const uslugify = (input) => {
  uslug(input)
};

let DEFAULT_OPTIONS = {
  toc: true
};

function createInstance() {
  return MarkdownIt()
    .use(MetadataPlugin)
    .use(TOCPlugin)
    .use(AnchorPlugin, {
      slugify: uslugify
    });
}


function process(md: string, options?: ArticleProcessor.ProcessOptions): ArticleProcessor.ProcessContext {
  let mergedOptions = _.merge(DEFAULT_OPTIONS, options);

  let markdownIt = createInstance();

  let context = {};
  let tokens = markdownIt.parse(md, context);
  let html = markdownIt.renderer.render(tokens, context);

  context['md'] = md;
  context['html'] = html;

  return context;
}


export default {
  process
};
