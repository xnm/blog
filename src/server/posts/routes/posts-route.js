/** Created by Aquariuslt on 4-16-2016.*/
'use strict';

var articleController = require('../controllers/article-controller');

module.exports = function postRoute(app){
  app.route('/api/rss/articleList').get(articleController.getAll);
};