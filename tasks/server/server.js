/** Created by CUIJA on 2015-11-16.*/
'use strict';
var gulp = require('gulp');
var config = require('../config');
var express = require('express');
var path = require('path');
var _ = require('lodash');
var glob = require('glob');
var winston = require('winston');
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({'timestamp': true})
  ]
});



module.exports = gulp.task('server', function (next) {
  start();
  if(next){
    next();
  }
});






function initModulesClientRoutes(app) {
  var staticServerPath = config.folder.build;
  if (process.env.NODE_ENV == 'release') {
    staticServerPath = config.folder.release;
  }
  app.use('/', express.static(path.resolve('./' + staticServerPath)));
}

function initModulesServerRoutes(app) {
  var serverRoutePath = [
    'src/server/!(home)/**/routes/*.js',
    'src/server/home/routes/*.js'
  ];
  var moduleServerRoutePath = getGlobalPaths(serverRoutePath);
  moduleServerRoutePath.forEach(function (routePath) {
    require(path.resolve(routePath))(app);
  });
}

//TODO:Add 'bodyParser' for request adding
function initModulesConfiguration(app) {

}


function initExpress() {
  var app = express();
  initModulesClientRoutes(app);
  initModulesServerRoutes(app);
  initModulesConfiguration(app);
  return app;
}


function init(callback) {
  var app = initExpress();
  if (callback) {
    callback(app);
  }
}

function start(callback) {
  init(function (app) {
    app.listen(config.ports.staticServer, function (error) {
      if(error){
        logger.error("Error:"+error);
      }
      logger.info("Node Environment:" + process.env.NODE_ENV);
      logger.info("Listen Port:" + config.ports.staticServer);
      if (callback) {
        callback(app);
      }
    });
  });

}









/** Utils Function **/

/**
 * To scan the path array regex patterns
 * @param {*} globPatterns the regex patterns to match multi path
 * @param {*} [excludes] excludes the paths ignore to scan
 * @return {*} the folder path without '*'
 * */
function getGlobalPaths(globPatterns, excludes) {
  var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');
  var output = [];
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(function (globPattern) {
      output = _.union(output, getGlobalPaths(globPattern, excludes));
    });
  }
  else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    }
    else {
      var files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map(function (file) {
          if (_.isArray(excludes)) {
            for (var i = 0; i < excludes.length; i++) {
              file = file.replace(excludes[i], '');
            }
          }
          else {
            file = file.replace(excludes, '');
          }
          return file;
        });
      }
      output = _.union(output, files);
    }
  }
  return output;
}
