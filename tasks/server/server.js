/** Created by Aquariuslt on 4-16-2016.*/
var gulp = require('gulp');
var express = require('express');
var path = require('path');
var glob = require('glob');
var config = require('../config/config');
var logger = config.logger;
var errorUtil = require('../../src/server/posts/utils/error-util');
var pathUtil = require('../../src/server/posts/utils/path-util');
var articleCompileUtils = require('../../src/server/posts/utils/article-compile-util');

module.exports = gulp.task('server',function(next){
  start();
  if(next){
    next();
  }
});



function start(callback){
  init(function(app){
    app.listen(config.domPort,function(error){
      errorUtil.handleError(error);
      logger.info('Node Environment :',process.env.NODE_ENV);
      logger.info('Listening Port   :',config.domPort);
      if(callback){
        callback(app);
      }
    })
  })
}

function initExpress(){
  var app = express();
  initModulesConfiguration(app);
  initModulesServerRoutes(app);
  initModulePreSetup();
  return app;
}

function init(callback) {
  var app = initExpress();
  if (callback) {
    callback(app);
  }
}





function initModulesServerRoutes(app) {
  var serverRoutePath = [
    'src/server/**/**/routes/*.js'
  ];
  var moduleServerRoutePath = pathUtil.getGlobalPaths(serverRoutePath);
  moduleServerRoutePath.forEach(function (routePath) {
    logger.info('Route resolving:',routePath);
    require(path.resolve(routePath))(app);
  });
}

//TODO:Add 'bodyParser' for request adding
function initModulesConfiguration(app) {
  process.on('uncaughtException', function (error) {
    errorUtil.handleError(error)
  });

  process.on('SIGINT', function () {
    process.exit(0);
  });



  //Allow Cross domain/port access
  app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });
}


//Read Markdown Article set into db.
function initModulePreSetup(){
  articleCompileUtils.loadArticles();
}