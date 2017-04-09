/** Created by Aquariuslt on 2016-01-16.*/
/*
* return the first element of the array
* */
'use strict';

var _ = require('lodash');

module.exports = function activityArrayFilter(){
  return function(input){
    if(_.isArray(input)){
      return input[0];
    }
    return input;
  }
};