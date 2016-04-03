/** Created by Aquariuslt on 4/3/16 */

var articleService = require('../services/article-service')();


module.exports = function tagController($stateParams,$interval){
  var vm = this;

  vm.atomList = [
    "http://blog.aquariuslt.com/atom",
    "http://debug.aquariuslt.com/atom",
    "http://game.aquariuslt.com/atom"
  ];
  vm.tagName = $stateParams.tagName;
  vm.indeterminateValue = 0;
  vm.showProgressBar = false;
  vm.tagDetailList = [];
  
  init();
  
  function init(){
    loadTagDetail();
  }


  function loadTagDetail(){
    startInterval();
    articleService.loadArticleSummaryList(vm.atomList,function(error,summaryList){
      vm.tagDetailList = articleService.filterArticleListByTagName(summaryList,vm.tagName);
      stopInterval();
    });
  }
  
  



  function updateProgressBar(){
    if(vm.showProgressBar){
      vm.indeterminateValue += 1;
      if (vm.indeterminateValue > 100) {
        vm.indeterminateValue = 0;
      }
    }
  }


  function startInterval(){
    vm.showProgressBar = true;
    $interval(updateProgressBar, 100, 0, true);
  }

  function stopInterval(){
    vm.showProgressBar = false;
    $interval.cancel(updateProgressBar);
  }
  
};