import * as uslug from 'uslug';
import * as MarkdownIt from 'markdown-it';
import * as AnchorPlugin from 'markdown-it-anchor';
import {MetadataPlugin, TOCPlugin, DetectImagesPlugin} from '@utils/markdown-it-plugins/lib';

const uslugify = (input) => {
  uslug(input)
};


function createInstance() {
  return MarkdownIt()
    .use(MetadataPlugin)
    .use(TOCPlugin)
    .use(DetectImagesPlugin)
    .use(AnchorPlugin, {
      slugify: uslugify
    });
}


function process(md: string) {

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
