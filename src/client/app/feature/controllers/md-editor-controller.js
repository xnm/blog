/** Created by Aquariuslt on 4/20/16.*/

var angular = require('angular');

var _ = require('lodash');

var errorUtil = require('../../common/utils/error-util');

var pageService = require('../../common/services/page-service')();
var mdService = require('../../feature/services/md-service')();


module.exports = function mdEditorController($window,$scope,$mdDialog,$mdMedia,$log,$document,$cookies){
  var vm = this;

  vm.editorContent = '';
  vm.previewContent = '';

  vm.compileMarkdownContent = compileMarkdownContent;

  /**Menu Control*/
  vm.showOptionsTagDialog = showOptionsTagDialog;




  init();


  function init(){
    initTitle();
  }


  function initTitle(){
    pageService.setTitle('Markdown Editor');
  }
  
  /**
   * Get selected compiled from cookies
   * */
  function constructCompileOptions(){
    var formatOptions = JSON.parse($cookies.get('formatOptions'));
  }
  
  function compileMarkdownContent(){

    vm.previewContent = mdService.compile(vm.editorContent);
  }


  function showOptionsTagDialog($event){
    
    //noinspection JSCheckFunctionSignatures
    $mdDialog.show({
      templateUrl:'app/feature/views/md-editor-format-options-template.html',
      parent:angular.element($document.body),
      targetEvent:$event,
      clickOutsideToClose:true
    }).then(function(){
      compileMarkdownContent();
    },function(){
      $log.info('cancel edit format options.');
    });
  }

};