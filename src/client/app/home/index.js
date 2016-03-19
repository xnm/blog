/** Created by Aquariuslt on 2016-03-19.*/
'use strict';
var angular = require('angular');
var ngMaterial = require('angular-material');
var ngMessages = require('angular-messages');
var ngAnimate = require('angular-animate');
var ngMdIcons = require('angular-material-icons');



var themeConfig = require('../common/configs/theme');
var locationConfig = require('../common/configs/location');

var homeRoutes = require('./routes/home-routes');

var templates = require('../../../../dist/templates');

var headerController = require('../common/controllers/header-controller');
var navbarController = require('../common/controllers/navbar-controller');

var feature = require('../feature');

module.exports = angular.module('home',[
  'ngMaterial',
  'ngMessages',
  'ngAnimate',
  'ngMdIcons',
  'ui.router',
  'templates',
  'feature'
])
  .controller('headerController',headerController)
  .controller('navbarController',navbarController)
  .config(themeConfig)
  .config(locationConfig)
  .config(homeRoutes)
;