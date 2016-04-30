/** Created by Aquariuslt on 2016-03-19.*/
'use strict';
var angular = require('angular');
var ngCookies = require('angular-cookies');
var ngMaterial = require('angular-material');
var ngMessages = require('angular-messages');
var ngAnimate = require('angular-animate');
var ngMdIcons = require('angular-material-icons');

var featureRoute = require('./routes/feature-routes');

var markdownService = require('./services/markdown-service');


var markdownEditorController = require('./controllers/markdown-editor-controller');
var markdownEditorFormatOptionsController = require('./controllers/markdown-editor-format-options-controller');


module.exports = angular.module('feature',[
  'ngMessages',
  'ngAnimate',
  'ngMdIcons',
  'ui.router',
  'templates',
  'ngCookies'
]).factory(markdownService)
  .config(featureRoute)
  .controller('markdownEditorController', markdownEditorController)
  .controller('markdownEditorFormatOptionsController', markdownEditorFormatOptionsController)
;