/* Created by Aquariuslt on 14/04/2017.*/
let baseConfig = {
  favicon: 'favicon.png',
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
  input: {
    posts: 'src/data/posts/**/*.md',
    empty: 'tasks/template/empty',
    sitemap: 'tasks/template/sitemap.xml',
    manifest:'tasks/template/manifest.webapp',
    properties: 'application.yml',
  },
  output: {
    indexes: 'api/indexes.json',
    post: 'api/post',
    sitemap: 'sitemap.xml',
    application: 'api/application.json'
  }
};

export default baseConfig;
