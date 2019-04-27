import * as MarkdownIt from 'markdown-it';
import { MetadataPlugin, TOCPlugin, SummaryPlugin, DetectImagesPlugin } from '../lib';

import * as sample from './__fixtures__/sample-bundle.md';


describe('@utils/markdown-it-plugins: entry', (): void => {
  it('# should work with all plugins without errors', (): void => {
    const md = MarkdownIt()
      .use(DetectImagesPlugin)
      .use(MetadataPlugin)
      .use(TOCPlugin)
      .use(SummaryPlugin);


    const context = {};
    md.parse(sample, context);
  });
});
