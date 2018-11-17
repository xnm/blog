import Config from 'markdown-it-chain';

function createInstance() {

  const config = new Config();

  config.plugin('none').use(function(){}).end();

  const md = config.toMd();

  return md;
}

export default {
  createInstance
};
