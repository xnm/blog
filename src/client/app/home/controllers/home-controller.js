/** Created by Aquariuslt on 2016-03-25.*/
'use strict';
var articleService = require('../services/article-service')();



module.exports = function homeController($log){
  var vm = this;

  vm.atomList = [
    "http://blog.aquariuslt.com/atom",
    "http://debug.aquariuslt.com/atom",
    "http://game.aquariuslt.com/atom"
  ];
  vm.articleSummaryList = [];


  init();







  function init(){
    loadArticleSummaryList();
  }

  function loadArticleSummaryList(){
    articleService.loadArticleSummaryList(vm.atomList,function(error,summaryList){
      vm.articleSummaryList = summaryList;
      $log.info('load articleSummaryList complete. count of articleSummary:',vm.articleSummaryList.length);
      //$log.info('articleSummary schema example:',vm.articleSummaryList);
    });
  }
  
  
};