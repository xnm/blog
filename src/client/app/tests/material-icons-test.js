/** Created by Aquariuslt on 2016-03-21.*/
'use strict';

var path = require('path');
var glob = require('glob');
var _ = require('lodash');


var mdIcons = require('material-design-icons');
var mdIconStaticPath = mdIcons.STATIC_PATH;

glob(mdIconStaticPath + '/**/svg/production/*.svg',{},function(error,files){
  _.each(files,function(file){
    console.log(path.basename(file)+path.extname(file));
  })
});


