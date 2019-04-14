import * as uslug from 'uslug';
import * as MarkdownIt from 'markdown-it';
import * as AnchorPlugin from 'markdown-it-anchor';
import { DetectImagesPlugin, MetadataPlugin, SummaryPlugin, TOCPlugin } from '@utils/markdown-it-plugins/lib';
import * as path from 'path';
import * as fs from 'fs';

const uslugify = (input): string => {
  return uslug(input);
};

function createInstance(): MarkdownIt {
  return MarkdownIt()
    .use(MetadataPlugin)
    .use(TOCPlugin)
    .use(SummaryPlugin)
    .use(DetectImagesPlugin)
    .use(AnchorPlugin, {
      slugify: uslugify
    });
}


function parse(filename: string, md: string): BlogModel.Post {
  const markdownIt = createInstance();

  const context: BlogModel.Post = {
    filename,
    md,
    html: '',
    metadata: {
      title: '',
      created: '',
      updated: '',
      category: ''
    }
  };
  context.html = markdownIt.render(md, context);
  return context;
}

function init(filepath: string): BlogModel.PostFile {
  const filename = path.basename(filepath, '.md');
  const mdContent = fs.readFileSync(filepath).toString();

  return parse(filename, mdContent);
}


export default {
  init,
  parse
};
