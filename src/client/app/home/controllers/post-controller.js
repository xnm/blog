/** Created by Aquariuslt on 4/4/16.*/
var _ = require('lodash');

var errorUtil = require('../../common/utils/error-util');

var pageService = require('../../common/services/page-service')();
var articleService = require('../services/article-service')();

module.exports = function postController($log,$stateParams,$state){
  var vm = this;
  vm.tagLinkPrefix = '#/tag/';
  vm.postLink = $stateParams.postLink;
  vm.postDetail = {};
  vm.showProgressBar = false;
  vm.postContent = {};

  vm.disqusConfig = {
    disqus_shortname:'althome',
    disqus_identifier: vm.postLink,
    disqus_url: vm.postLink
  };

  init();


  function init(){
    initTitle();
    loadPostDetail();
  }

  function initTitle(){
    pageService.setTitle('Post');
  }
  
  function loadPostDetail(){
    showProgressBar();
    articleService.loadPostDetail(vm.postLink,function(error,postDetail){
      errorUtil.handleError(error);
      $log.info('postDetail:',postDetail);
      if(_.isUndefined(postDetail)){
        hideProgressBar();
        $state.go('otherwise');
      }
      else{
        vm.postDetail = postDetail;
        pageService.setTitle(postDetail.title);
        hideProgressBar();
      }
    });
  }
  
  function showProgressBar(){
    vm.showProgressBar = true;
  }
  
  function hideProgressBar(){
    vm.showProgressBar = false;
  }

};
