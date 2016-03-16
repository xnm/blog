/** Created by Aquariuslt on 2016-03-15.*/
'use strict';

var winston = require('winston');
var logger = new winston.Logger({
  level: 'debug',
  transports: [
    new (winston.transports.Console)({
      timestamp: Date.now()
    })
  ]
});
var htmlminOptions = {
  comments: false,
  empty: true,
  spare: true,
  quotes: true
};
module.exports = {
  logger: logger,
  htmlminOptions: htmlminOptions
};