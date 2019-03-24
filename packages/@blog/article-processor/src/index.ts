import {ArticleProcessor} from '@blog/article-processor/types';

import * as uslug from 'uslug';
import * as MarkdownIt from 'markdown-it';
import * as AnchorPlugin from 'markdown-it-anchor';
import {MetadataPlugin, TOCPlugin} from '@utils/markdown-it-plugins/lib';

const uslugify = (input) => {
  uslug(input)
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
