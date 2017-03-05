/* Created by Aquariuslt on 2017-03-04.*/


let config = {

  cname: 'blog.aquariuslt.com',

  buildDir: 'build',
  distDir: 'dist',
  emptyFile: 'src/tasks/empty.js',

  deployOptions: {
    repo: 'https://github.com/aquariuslt/aquariuslt.github.io.git',
    remote: 'origin',
    branch: 'master',
    cacheDir: '.cache',
    clone:'.cache',
    logger: function(message) {
      console.log(message);
    }
  },

  input: {
    posts: 'src/data/posts/**/*.md'
  },

  //posts
  output: {
    posts: 'posts.json'
  }
};

export default config;