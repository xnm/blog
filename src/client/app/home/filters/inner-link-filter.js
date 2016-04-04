/** Created by Aquariuslt on 4/4/16.*/


module.exports = function innerLinkFilter(){
  return function(externalLink){
    var innerLinkPrefix = '#/post/';
    var splitExp = 'com/';
    var firstIndex = externalLink.indexOf(splitExp);
    var externalLinkLength = externalLink.length;
    return innerLinkPrefix+externalLink.substr(firstIndex+ splitExp.length,externalLinkLength);
  }
};