/** Created by Aquariuslt on 2015-11-16.*/
'use strict';
var activitiesController = require('../controllers/activities.controller');

function homeRoute(app) {

  /*Rss Route*/
  app.route('/api/rss/activities').get(activitiesController.getRecentActivities);
  app.route('/api/rss/sitemaps').get(activitiesController.getSitemaps);
}

module.exports = homeRoute;