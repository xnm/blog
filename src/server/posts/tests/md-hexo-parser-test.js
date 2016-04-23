/** Created by Aquariuslt on 4-23-2016.*/

var fs = require('fs');

var _ =require('lodash');


var marked = require('marked');


var mdContent = fs.readFileSync('./beanutils-vs-reflection.md').toString();

var htmlContent = marked(mdContent);


var lexer = new marked.Lexer();
var tokens = lexer.lex(mdContent);


//for Hexo Parser,we regards the first '---' as hr
//before <hr> all are Hexo metadata

var hexoMetadataIndex = _.findIndex(tokens,{
  type:'hr'
});

// console.log(tokens);
console.log('hexo metadata index in tokens:',hexoMetadataIndex);

var hexoMetadataTokens = tokens.slice(0,hexoMetadataIndex+1);

console.log(hexoMetadataTokens);



//combine tags
var hexoTags = [];
var hexoTagStartIndex = _.findIndex(hexoMetadataTokens,{type:'list_start'});
var hexoTagEngIndex = _.findIndex(hexoMetadataTokens,{type:'list_end'});
for(var tagIndex=hexoTagStartIndex+1; tagIndex<hexoTagEngIndex; tagIndex++){
  if( _.isEqual(hexoMetadataTokens[tagIndex].type , 'text')){
    hexoTags.push(hexoMetadataTokens[tagIndex].text);
  }
}


console.log('hexo tags:');
console.log(hexoTags);

//combine all headers
var hexoHeaderString = '';
for(var headerIndex=0; headerIndex<hexoTagStartIndex; headerIndex++){
  if(_.isEqual(hexoMetadataTokens[headerIndex].type,'paragraph')){
    hexoHeaderString += hexoMetadataTokens[headerIndex].text;
  }
}

var headerKeyValueList = hexoHeaderString.split('\n');
console.log(headerKeyValueList);

//construct final hexo header
var hexoHeader = {};
for(var i=0,headerLength=headerKeyValueList.length;i<headerLength;i++){
  var kvp = headerKeyValueList[i].split(':');
  
}


