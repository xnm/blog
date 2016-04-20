/** Created by Aquariuslt on 4/20/16.*/


var _ = require('lodash');

var errorUtil = require('../../common/utils/error-util');

var pageService = require('../../common/services/page-service')();
var mdService = require('../../feature/services/md-service')();

module.exports = function mdEditorController($log){
  var vm = this;

  vm.editorContent = '';
  vm.previewContent = '';

  vm.compileMarkdownContent = compileMarkdownContent;


  init();


  function init(){
    initTitle();
  }


  function initTitle(){
    pageService.setTitle('Markdown Editor');
  }
  
  
  function compileMarkdownContent(){
    vm.previewContent = mdService.compile(vm.editorContent);
  }
};