/* Created by Aquariuslt on 14/04/2017.*/
let baseConfig = {
  src: 'src',
  build: 'build',
  dist: 'dist',
  cache: '.cache',
  assets: [
    {
      from: 'src/assets',
      to: 'assets'
    }
  ],
  favicon: 'favicon.png',

  // Application Level Data
  emptyFile: 'tasks/empty.js',
  properties: 'application.yml',
  input: {
    posts: 'src/data/posts/**/*.md'
  },
  output: {
    indexes: 'indexes.json',
    posts: 'posts.json',
    application: 'application.json'
  }
};

export default baseConfig;
