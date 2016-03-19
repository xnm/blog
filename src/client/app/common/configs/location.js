/** Created by Aquariuslt on 2016-03-19.*/
'use strict';

require('angular-ui-router');

module.exports = ['$locationProvider',function($locateProvider){
  $locateProvider.html5Mode(false);
}];