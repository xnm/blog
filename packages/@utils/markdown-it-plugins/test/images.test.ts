import * as MarkdownIt from 'markdown-it';
import DetectImagesPlugin from '../lib/images';

import * as sample from './fixtures/sample-images.md';


describe('@utils/markdown-it-images', () => {
  it('# should detect images at env', () => {

    let md = MarkdownIt().use(DetectImagesPlugin);

    let context = {};

    md.parse(sample, context);

    expect(context).toHaveProperty('images');
    expect(context['images'].length).toBe(2);

  });
});
