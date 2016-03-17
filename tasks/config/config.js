/** Created by Aquariuslt on 2016-03-14.*/
'use strict';
var _ = require('lodash');
var winston = require('winston');

var config = {
  src:'src',
  dist:'dist',
  index:'src/client/index.html',
  entry:'src/client/app/boot.js',
  bundle:{
    script:'bundle.js',
    style:'bundle.css'
  },
  port:3000
};

module.exports = initEnvironmentConfig();

function initEnvironmentConfig(){
  //noinspection JSUnresolvedVariable
  var environment = process.env.NODE_ENV||'development';
  var environmentConfig = {};
  if(_.isEqual(environment,'release')){
    environmentConfig = require('./env/release');
  }
  else{
    environmentConfig = require('./env/development');
  }
  return _.extend(config, environmentConfig);
}