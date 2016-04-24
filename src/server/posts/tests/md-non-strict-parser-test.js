/** Created by Jason Cui on 2016-04-24.*/
var fs = require('fs');

var marked = require('marked');

var mdContent = fs.readFileSync('../articles/blog-with-hexo.md').toString();

var lexer = new marked.Lexer();
var tokens = lexer.lex(mdContent);


console.log('tokens:');
console.log(tokens);