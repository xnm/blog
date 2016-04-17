/** Created by Aquariuslt on 2016-03-25.*/
'use strict';

var angular = require('angular');
//noinspection JSCheckFunctionSignatures
var $injector = angular.injector(['ng']);
var $log = $injector.get('$log');
var $http = $injector.get('$http');

var _ = require('lodash');
var async = require('async');

var errorUtil = require('../../common/utils/error-util');

var articleService = function articleService() {

  var atomList = [
    "http://"+document.domain+":8090/api/rss/articleList"
  ];

  var articleSummaryListCache = [];

  function loadArticleSummaryList(callback) {
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
        _.each(articleSummaryList, function (articleSummary) {
          handleArticleSummary(articleSummary);
          resultArticleSummaryList.push(articleSummary);
        });
      });
      //update articleCache
      articleSummaryListCache = resultArticleSummaryList;

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
          var jsonData = response.data;
          asyncCallback(null, jsonData);
        }, function failureCallback(response) {
          errorUtil.handleError(response);
          asyncCallback(null, null);
        });
    }

    function convertXmlToJsonData(jsonData, asyncCallback) {
      $log.info('2.convertToJsonData:', atomUrl);
      asyncCallback(null, jsonData);
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

  /**
   * Get innerText from html body.
   * When using document.createElement(htmlString),
   * which htmlString contains image link, will load image from its src.
   * it will cause much network time,so replace the image link.
   * */
  function handleArticleSummary(articleSummary) {
    handleArticleSummaryContent(articleSummary);
    handleArticleSummaryCategories(articleSummary);
  }

  function handleArticleSummaryContent(articleSummary) {
    var imageLinkRegex = /<img\s[^>]*?src\s*=\s*['"]([^'"]*?)['"][^>]*?>/ig;
    var originalHtmlString = articleSummary.html;
    var convertedHtmlString = originalHtmlString.replace(imageLinkRegex, '');
    var div = document.createElement("div");
    div.innerHTML = convertedHtmlString;
    articleSummary.text = div.innerText;
  }


  function handleArticleSummaryCategories(articleSummary) {
    /** @namespace articleSummary.tags */
    if (!_.isArray(articleSummary.tags)) {
      var originalCategory = _.clone(articleSummary.tags);
      articleSummary.tags = [originalCategory];
    }
  }

  function filterArticleListByTagName(articleSummaryList, tagName) {
    var tagDetailList = [];
    _.each(articleSummaryList, function (articleSummary) {
      if (_.indexOf(articleSummary.tags, tagName)>=0){
        tagDetailList.push(articleSummary);
      }
    });
    return tagDetailList;
  }

  function loadPostDetail(postLink, callback) {
    /**
     * Find article summary Detail
     * @example postLink:'2016/04/03/angular-dynamic-title-using-factory/'
     * will find this post link in detail
     * */
    function findDetailFromCache() {
      $log.info('load detail from articleSummaryListCache.');
      var postDetail = _.find(articleSummaryListCache, function (post) {
        return post.link.indexOf(postLink) >= 0;
      });
      var error = _.isUndefined(postDetail) ? new Error('can not find post detail') : null;
      callback(error, postDetail);
    }

    if (_.isEmpty(articleSummaryListCache)) {
      loadArticleSummaryList(function () {
        findDetailFromCache();
      });
    }
    else {
      findDetailFromCache();
    }
  }

  return {
    loadArticleSummaryList: loadArticleSummaryList,
    filterArticleListByTagName: filterArticleListByTagName,
    loadPostDetail: loadPostDetail
  };
};

module.exports = articleService;