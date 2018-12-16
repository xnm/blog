import Config from 'markdown-it-chain';

function pureInstance() {

  const config = new Config();
  config.plugin('none').use(function(){}).end();

  return config.toMd();
}

export default pureInstance()
