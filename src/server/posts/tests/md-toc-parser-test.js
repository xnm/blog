/** Created by Aquariuslt on 4/24/16.*/


var fs = require('fs');
var marked = require('marked');

var _ = require('lodash');


var mdContent = fs.readFileSync('./tree.md').toString();

var lexer = new marked.Lexer();

var tokens = lexer.lex(mdContent);




// var htmlContent = marked.parser(tokens);
// console.log(htmlContent);


/**
 * 1.Construct tree list by depth.
 * 2.Replace [TOC] as tokens,add # link as
 * */

function tocLinkCase(text){
  var spaceRegex = / /ig;
  var spaceReplacement = '-';
  var lowerText = _.toLower(text);
  return _.replace(lowerText, spaceRegex, spaceReplacement);
}

var tagStart = '<pre>';
var tagEnd =  '</pre>';
_.forEach(tokens,function(currentToken){
  
  if(_.isEqual(currentToken.type,'heading')){
    var depth = currentToken.depth ;
    var treeNodePrefix = '';
    for(var i=0;i<depth-1;i++){
      treeNodePrefix += '&nbsp;&nbsp;';
    }
    //console.log(treeNodePrefix+currentToken.text);
    tagStart+= (treeNodePrefix+'<a href="#' + tocLinkCase(currentToken.text) + '">'  + currentToken.text + '</a>\n');
  }
  
});

var tocBlockHtml = tagStart+tagEnd;
console.log(tocBlockHtml);


_.forEach(tokens,function(currentToken){
  if(_.isEqual(currentToken.type,'paragraph') &&_.isEqual(currentToken.text,'[TOC]')){
    currentToken.type = 'html';
    delete currentToken.lang;
    currentToken.text = tocBlockHtml;
  }
});


var htmlContent = marked.parser(tokens);
console.log(htmlContent);



