import Config from 'markdown-it-chain';
import anchor from 'markdown-it-anchor';

import slugify from './slugify';

function createInstance() {

  const config = new Config();
  config.plugin('slugify').use(anchor, slugify).end()
  ;

  return config.toMd();
}

export default createInstance();
