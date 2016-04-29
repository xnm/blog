/** Created by Aquariuslt on 2016-03-19.*/
'use strict';
var angular = require('angular');
var ngCookies = require('angular-cookies');
var ngMaterial = require('angular-material');
var ngMessages = require('angular-messages');
var ngAnimate = require('angular-animate');
var ngMdIcons = require('angular-material-icons');


var featureRoute = require('./routes/feature-routes');

var mdService = require('./services/md-service');


var mdEditorController = require('./controllers/md-editor-controller');
var mdEditorFormatOptionsController = require('./controllers/md-editor-format-options-controller');


module.exports = angular.module('feature',[
  'ngMessages',
  'ngAnimate',
  'ngMdIcons',
  'ui.router',
  'templates',
  'ngCookies'
]).factory(mdService)
  .config(featureRoute)
  .controller('mdEditorController',mdEditorController)
  .controller('mdEditorFormatOptionsController',mdEditorFormatOptionsController)
;