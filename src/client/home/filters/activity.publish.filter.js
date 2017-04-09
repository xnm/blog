/** Created by Aquariuslt on 2016-01-17.*/
/**
  * return published or update by update time
 **/
'use strict';

var _ = require('lodash');

module.exports = function activityPublishFilter(){
  return function(activity){
    if(_.isEqual(activity.published,activity.updated)){
      return 'Published';
    }
    return 'Published';
  }
};