/** Created by Aquariuslt on 4-17-2016.*/


var config = require('../../../../tasks/config/config');

var _ = require('lodash');

module.exports.getAll = getAll;
module.exports.findByCriteria = findByCriteria;
module.exports.insert = insert;





function getAll(){
  return global.articles;
}

function findByCriteria(criteria){
  
}

function insert(article){
  if(_.isEmpty(global.articles)){
    global.articles = [];
  }
  
  global.articles.push(article);
}

