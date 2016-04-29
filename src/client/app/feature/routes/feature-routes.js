/** Created by Aquariuslt on 2016-03-19.*/
'use strict';
var angular = require('angular');
var $injector = angular.injector(['ng']);
var $log = $injector.get('$log');

module.exports = function($stateProvider){
  $log.info('load feature route');
  $stateProvider
    .state('md-editor',{
      url:'/features/md-editor',
      templateUrl:'app/feature/views/md-editor.html'
    })
};