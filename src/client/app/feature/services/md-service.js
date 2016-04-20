/** Created by Aquariuslt on 4/20/16.*/

/** Service for markdown compile, custom parser */
var angular = require('angular');
//noinspection JSCheckFunctionSignatures
var $injector = angular.injector(['ng']);
var $log = $injector.get('$log');

var _ = require('lodash');
var marked = require('marked');




var mdService = function mdService(){
  var svc = this;




  return {
    compile:compile
  }
};


function compile(mdContent){
  return marked(mdContent, {});
}


module.exports = mdService;