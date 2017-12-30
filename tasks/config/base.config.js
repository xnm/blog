/**
 * Spec base folders structure variables here
 * */

let baseConfig = {
  dir: {
    cache: '.cache',
    src: 'src',
    build: 'build',
    dist: 'dist',
    test: {
      unit: 'test/unit',
      e2e: 'test/e2e'
    },
    // assets which need webpack-copy-plugin
    assets: [
      {
        from: 'src/assets',
        to: 'assets'
      }
    ],
    posts: 'posts',
    post: 'post'
  },
  // files which need webpack-html-plugin moving during build (or any other)
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
