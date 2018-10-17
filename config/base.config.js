/**
 * Spec base folders structure variables here
 * */

let baseConfig = {
  dir: {
    cache: '.cache',
    src: 'src',
    build: 'build',
    dist: {
      root: 'dist',
      js: 'static/js',
      css: 'static/css',
      img: 'static/img',
      fonts: 'static/fonts'
    },
    test: {
      unit: 'test/unit',
      e2e: 'test/e2e'
    },
    assets: [
      {
        from: 'src/static',
        to: 'static'
      }
    ],
    posts: 'posts',
    post: 'post'
  },
  file: {
    favicon: 'favicon.png'
  },

  // development-level config
  dev: {
    host: '127.0.0.1',
    port: 5000
  }
};

export default baseConfig;
