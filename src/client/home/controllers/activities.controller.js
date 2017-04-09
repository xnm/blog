/** Created by Aquariuslt on 2016-01-15.*/
'use strict';

var async = require('async');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser();
var _ = require('lodash');

module.exports = function activitiesController($scope,$http){
  $scope.atomList = [];
  $scope.activitiesEntryArray =[];
  $scope.activities = [];



  init();


  function init(){
    async.series([
      resetData,
      initAtomList,
      initActivitiesList
    ],function(error,result){
      console.log('error:',error);
      console.log('result',result);
    });
  }

  function resetData(callback){
    $scope.atomList = [];
    $scope.activitiesEntryArray =[];
    $scope.activities = [];
    callback();
  }

  function initAtomList(callback){
    console.log('initAtomList');
    $http({
      url:'/api/rss/activities',
      method:'GET'
    }).then(function success(response) {
      $scope.atomList = response.data;
      callback();
    }, function error() {
      $scope.atomList = [];
      callback()
    });
  }

  function initActivitiesList(callback){
    console.log('initActivitiesList');
    async.each($scope.atomList,function(item){
      $http({
        url:item,
        method:'GET'
      }).then(
        function success(response){
          console.log('getting response from ',item);
          xmlParser.parseString(response.data,function(error,result){
            if(!_.isEmpty(error)){
              console.log('convert xml to json error:',error);
            }
            $scope.activitiesEntryArray=$scope.activitiesEntryArray.concat(result.feed.entry);
          });
        },
        function error(){
          callback();
        }
      );
    },function(error){
      console.log('error in getActivities from atomList',error);
    });
  }
};

