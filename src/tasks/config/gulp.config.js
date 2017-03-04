/* Created by Aquariuslt on 2017-03-04.*/


let config = {

  cname:'blog.aquariuslt.com',

  buildDir:'build',
  distDir: 'dist',
  emptyFile:'src/tasks/empty.js',

  input:{
    posts:'src/data/posts/**/*.md'
  },

  //posts
  output:{
    posts:'posts.json'
  }
};

export default config;