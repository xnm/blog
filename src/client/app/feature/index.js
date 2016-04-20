/** Created by Aquariuslt on 2016-03-19.*/
'use strict';
var angular = require('angular');

var featureRoute = require('./routes/feature-routes');


var mdEditorController = require('./controllers/md-editor-controller');



module.exports = angular.module('feature',[
  'ngMessages'
]).config(featureRoute)
  .controller('mdEditorController',mdEditorController)
;