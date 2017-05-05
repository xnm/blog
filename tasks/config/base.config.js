/* Created by Aquariuslt on 14/04/2017.*/
let baseConfig = {
  dir: {
    src: 'src',
    build: 'build',
    dist: 'dist',
    cache: '.cache',
    assets: [
      {
        from: 'src/assets',
        to: 'assets'
      }
    ]
  },
  file: {
    favicon: 'favicon.png'
  },
  input: {
    posts: 'src/data/posts/**/*.md',
    empty: 'tasks/template/empty',
    sitemap: 'tasks/template/sitemap.xml',
    manifest: 'tasks/template/manifest.webapp',
    serviceWorkerRegistration: 'tasks/template/service-worker-registration.js',
    properties: 'application.yml',
  },
  output: {
    application: 'api/application.json',
    indexes: 'api/indexes.json',
    post: 'api/post',
    sitemap: 'sitemap.xml',
    serviceWorker: 'service-worker.js'
  }
};

export default baseConfig;
