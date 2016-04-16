/** Created by Aquariuslt on 4-16-2016.*/

/**
 * Target:Tags,Article + Parse Metadata
 * */


var fs = require('fs');

var _ = require('lodash');

var marked = require('marked');
var customRenderer = new marked.Renderer();
customRenderer.code = function (code,lang,escaped){
  if(!_.isEmpty(lang) && _.isEqual(lang,'metadata')){
    return '';
  }
  else{
    return new marked.Renderer().code(code,lang,escaped);
  }
};

var mdContent = fs.readFileSync('../articles/site-code-structure.md').toString();

var htmlContent = marked(mdContent,{
  renderer:customRenderer
});

//console.log(htmlContent);

var lexer = new marked.Lexer();
var tokens = lexer.lex(mdContent);
var metadataText = _.find(tokens,{
  type:'code',
  lang:'metadata'
});
// console.log(tokens);
// console.log(metadata);
var text = metadataText.text;
var metadata = JSON.parse(text);
console.log(text);
console.log(metadata.title);