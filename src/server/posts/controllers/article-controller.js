/** Created by Aquariuslt on 4-17-2016.*/

var articleFacade = require('../facade/article-facade');


module.exports.getAll = getAll;





function getAll(req,res){
  res.json(articleFacade.getAll());
}