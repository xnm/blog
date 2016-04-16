/** Created by Aquariuslt on 4-16-2016.*/

/**
 * 1.Load all md files.
 * 2.Compile to JsonObject and save as global value (Array|Map)
 * 3.Implement Memory-Database interface (in another utils like dbHelper,service)
 *
 * */
var fs = require('fs');

var config = require('../../../../tasks/config/config');
var logger = config.logger;
var pathUtil = require('./path-util');

var articleParser = require('./article-parser');

var articleFacade = require('../facade/article-facade');

module.exports.loadArticles = loadArticles;





function loadArticles(){
  logger.info('Loading Articles');
  var articlePath = pathUtil.getGlobalPaths(config.articles);

  articlePath.forEach(function(mdFilePath){
    logger.info('Loading Article:',mdFilePath);
    loadArticle(mdFilePath);
  });

}


/**
 * 1.Read md file as String
 * 2.Convert to markdown object using custom marked parser and renderer
 * 3.Saving to database
 * */
function loadArticle(mdFilePath){
  var fileNamePrefix = pathUtil.getFilePrefix(mdFilePath);
  var mdContent = fs.readFileSync(mdFilePath).toString();
  var article = articleParser.parseMarkdownString(fileNamePrefix,mdContent);
  articleFacade.insert(article);
}
