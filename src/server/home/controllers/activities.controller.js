/** Created by Aquariuslt on 2016-01-16.*/
'use strict';
var activitiesConfig = require('../config/activities.config');
var async = require('async');

module.exports.getRecentActivities = function(request,response){
  response.json(activitiesConfig.atoms);
};

module.exports.getSitemaps = function(request,response){
  response.json(activitiesConfig.sitemaps);
};



