/** Created by Aquariuslt on 4/20/16.*/

/** Service for markdown compile, custom parser */
var angular = require('angular');
//noinspection JSCheckFunctionSignatures
var $injector = angular.injector(['ng']);
var $log = $injector.get('$log');

var _ = require('lodash');
var marked = require('marked');

var hexoHeaderUtil = require('../utils/mdutils/hexo-header-util');
var nonStrictModeUtil = require('../utils/mdutils/non-strict-mode-util');

var mdService = function mdService(){
  var svc = this;
  



  return {
    compile:compile
  }
};


function compile(mdContent,compileOptions){
  var lexer = new marked.Lexer();
  var tokens = lexer.lex(mdContent);
  var combinedTokens = constructTokens(tokens,compileOptions);
  return marked.parser(combinedTokens);
}

function constructTokens(tokens,compileOptions){
  var combinedTokens = _.clone(tokens);
  _.forEach(compileOptions,function(compileOption){
    $log.info('compileOption:',compileOption);
    combinedTokens =  eval(compileOption+'Util.constructTokens')(combinedTokens);
  });
  combinedTokens.links = {};
  return combinedTokens;
}


module.exports = mdService;