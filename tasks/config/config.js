/** Created by Aquariuslt on 2016-03-14.*/
'use strict';
var _ = require('lodash');
var winston = require('winston');

var config = {
  src:'src',
  dist:'dist',
  index:'src/client/index.html',
  scripts:'src/client/**/**/*.js',
  styles:'src/client/styles/*.css',
  app:'app',
  views:'src/client/app/**/views/*.html',
  entry:'src/client/app/boot.js',
  bundle:{
    script:'bundle.js',
    style:'bundle.css',
    templates:'templates.js'
  },
  port:4000,
  materialIcons:[
    {
      "sizes": [24, 48],
      "ids": ["blue"],
      "fills": ["#005DAA"],
      "icons": [
        "**.**"
      ]
    }
  ]
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