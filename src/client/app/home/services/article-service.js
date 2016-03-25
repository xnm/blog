/** Created by Aquariuslt on 2016-03-25.*/
'use strict';

var angular = require('angular');
var injector = angular.injector(['ng']);
var $log = injector.get('$log');
var $http = injector.get('$http');

var _ = require('lodash');
var async = require('async');
var xml2js = require('xml2js');
//noinspection JSUnresolvedFunction
var xmlParser = new xml2js.Parser();

var articleService = function articleService() {
  return {
    loadArticleSummaryList: loadArticleSummaryList
  };


  function loadArticleSummaryList(atomList,callback) {
    function getAtomListFromUrlTask(atomUrl) {
      return function (asyncCallback) {
        $http.get(atomUrl, {})
          .then(function successCallback(response) {
            $log.info('getAtomListFromUrlTask success');
            asyncCallback(response.data);
          }).then(function failureCallback(error) {
          if (error) {
            $log.error('getAtomListFromUrlTask error:', error);
          }
        });
      }
    }

    function parseAtomListResult(){
      return function(responseData,asyncCallback){
        xmlParser.parseString(responseData,function(error,result){
          //noinspection JSUnresolvedVariable
          asyncCallback(result.feed.entry);
        });
      }
    }

    function loadSingleUrlArticleSummaryListTasks(atomUrl,asyncCallback){
      var tasks = [];
      tasks.push(getAtomListFromUrlTask(atomUrl));
      tasks.push(parseAtomListResult());

      async.waterfall(tasks,function(error,singleUrlArticleSummaryList){
        if(error){
          $log.error('loadSingleUrlArticleSummaryListTasks error:',error);
        }
        asyncCallback(null,singleUrlArticleSummaryList);
      });
    }

    


    $log.info('loading atomList:', atomList);
    var loadAtomSummaryTasks = [];
    _.each(atomList,function(atomUrl){
      loadAtomSummaryTasks.push(loadSingleUrlArticleSummaryListTasks(atomUrl));
    });
    async.parallel(loadAtomSummaryTasks,function(error,articleSummaryListArray){
      var articleSummaryList = [];
      _.each(articleSummaryListArray,function(singleUrlArticleSummaryList){
        $log.debug('singleArticleSummaryList:',singleUrlArticleSummaryList);
        articleSummaryList.push(singleUrlArticleSummaryList);
      });
      callback(articleSummaryList);
    });
  }
};

module.exports = articleService;