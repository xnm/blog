import * as MarkdownIt from 'markdown-it';
import DetectImagesPlugin from '../lib/images';

import * as sample from './__fixtures__/sample-images.md';

describe('@utils/markdown-it-images', (): void => {
  it('# should detect images at env', (): void => {
    const md = MarkdownIt().use(DetectImagesPlugin);

    const context = {};

    md.parse(sample, context);

    expect(context).toHaveProperty('images');
    expect(context['images'].length).toBe(2);
  });

  it('# should detect no images when no env', (): void => {
    const md = MarkdownIt().use(DetectImagesPlugin);
    md.parse(sample);
  });
});
