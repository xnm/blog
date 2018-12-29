import * as Config from 'markdown-it-chain';

function pureInstance() {

  const config = new Config();
  config.plugin('none').use(() => {
  }).end();

  return config.toMd();
}

export default pureInstance();
