/** Created by Aquariuslt on 2016-03-25.*/
'use strict';

var angular = require('angular');
//noinspection JSCheckFunctionSignatures
var $injector = angular.injector(['ng']);
var $log = $injector.get('$log');
var $http = $injector.get('$http');

var _ = require('lodash');
var async = require('async');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser( {
  explicitArray : false
});

var errorUtil = require('../../common/utils/error-util');


var articleService = function articleService() {
  return {
    loadArticleSummaryList: loadArticleSummaryList
  };

  function loadArticleSummaryList(atomList, callback) {
    var self = this;
    var parallelTasks = [];
    _.each(atomList, function (singleAtomUrl) {
      $log.info('add parallelTask:', singleAtomUrl);
      parallelTasks.push(loadArticleSummaryTask(singleAtomUrl));
    });
    async.parallel(parallelTasks, function (error, articleSummaryListArray) {
      errorUtil.handleError(error, self);
      var resultArticleSummaryList = [];
      _.each(articleSummaryListArray, function (articleSummaryList) {
        _.each(articleSummaryList,function(articleSummary){
          handleArticleSummary(articleSummary);
          resultArticleSummaryList.push(articleSummary);
        });
      });
      callback(null, resultArticleSummaryList);
    });
  }

  /**
   * load atom info from single url.
   * @param {String} atomUrl The url need to get info.like "http://blog.aquariuslt.com/atom"
   * */
  function loadArticleSummaryTask(atomUrl) {
    function loadXmlDataFromUrl(asyncCallback) {
      $log.info('1.loadXmlDataFromUrl:', atomUrl);
      $http.get(atomUrl)
        .then(function successCallback(response) {
          var xmlData = response.data;
          asyncCallback(null, xmlData);
        },function failureCallback(response) {
          errorUtil.handleError(response);
          asyncCallback(null,null);
        });
    }

    function convertXmlToJsonData(xmlData,asyncCallback) {
      $log.info('2.convertXmlToJsonData:', atomUrl);

      xmlParser.parseString(xmlData,function(error,result){
        errorUtil.handleError(error);
        asyncCallback(null,result.feed.entry);
      });
    }

    return function (callback) {
      $log.info('0.loadArticleSummaryTask start.');
      async.waterfall([
        loadXmlDataFromUrl,
        convertXmlToJsonData
      ], function (error, result) {
        errorUtil.handleError(error);
        return callback(null, result);
      });
    }
  }


  function handleArticleSummary(articleSummary){
    var div = document.createElement("div");
    div.innerHTML = articleSummary.content._;
    articleSummary.content.text = div.innerText;
  }

};

module.exports = articleService;