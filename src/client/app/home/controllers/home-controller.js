/** Created by Aquariuslt on 2016-03-25.*/
'use strict';
var articleService = require('../services/article-service')();



module.exports = function homeController($log,$interval){
  var vm = this;

  vm.atomList = [
    "http://blog.aquariuslt.com/atom",
    "http://debug.aquariuslt.com/atom",
    "http://game.aquariuslt.com/atom"
  ];
  vm.articleSummaryList = [];
  vm.determinateValue = 0;
  vm.showProgressBar = false;
  init();







  function init(){
    startInterval();
    loadArticleSummaryList();
  }

  function loadArticleSummaryList(){
    vm.showProgressBar = true;
    articleService.loadArticleSummaryList(vm.atomList,function(error,summaryList){
      vm.articleSummaryList = summaryList;
      $log.info('load articleSummaryList complete. count of articleSummary:',vm.articleSummaryList.length);
      $log.info('articleSummary schema example:',vm.articleSummaryList);
      vm.showProgressBar = false;
    });
  }

  function startInterval(){
    $interval(function() {
      // Increment the Determinate loader
      vm.determinateValue += 1;
      if (vm.determinateValue > 100) {
        vm.determinateValue = 15;
      }
    }, 100, 0, true);
  }
  
};