/** Created by CUIJA on 2015-11-16.*/
'use strict';


var headerController = require('./controllers/header.controller');
var homeController = require('./controllers/home.controller');
var activitiesController = require('./controllers/activities.controller');

var activityArrayFilter = require('./filters/activity.array.filter');
var activityPublishFilter = require('./filters/activity.publish.filter');

var homeRoutes = require('./routes/home.routes');
var template = require('../../../dist/tmp/templates');
var angular = require('angular');


module.exports = angular.module('home',[
  'ngAnimate',
  'ngResource',
  'ui.bootstrap',
  'ui.router',
  template.name
]).config(homeRoutes)
  .controller('homeController',homeController)
  .controller('headerController',headerController)
  .controller('pictureSlideController',pictureSlideController)
  .controller('activitiesController',activitiesController)
  .filter('activityArrayFilter',activityArrayFilter)
  .filter('activityPublishFilter',activityPublishFilter)
;