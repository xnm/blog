/** Created by Aquariuslt on 2016-03-19.*/
'use strict';
var angular = require('angular');
var ngCookies = require('angular-cookies');

var featureRoute = require('./routes/feature-routes');


var mdEditorController = require('./controllers/md-editor-controller');
var mdEditorFormatOptionsController = require('./controllers/md-editor-format-options-controller');


module.exports = angular.module('feature',[
  'ngMaterial',
  'ngMessages',
  'ngCookies'
]).config(featureRoute)
  .controller('mdEditorController',mdEditorController)
  .controller('mdEditorFormatOptionsController',mdEditorFormatOptionsController)
;