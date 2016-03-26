/** Created by Jason Cui on 3/26/16.*/
'use strict';


module.exports = function summaryFilter(){
  return function(content){
    return content.substring(0,80);
  }
};