/** Created by Aquariuslt on 2016-03-19.*/
'use strict';
var angular = require('angular');
var ngMaterial = require('angular-material');
var ngMessages = require('angular-messages');
var ngMdIcons = require('angular-material-icons');

var themeConfig = require('../common/configs/theme');

var templates = require('../../../../dist/templates');

var headerController = require('../common/controllers/header-controller');


module.exports = angular.module('home',[
  'ngMaterial',
  'ngMessages',
  'ngMdIcons',
  'templates'
])
  .controller('headerController',headerController)
  .config(themeConfig);