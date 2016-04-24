/** Created by Aquariuslt on 4/21/16.*/

var uploader = require('file-uploader');



var jpgFilePath = '/Users/Aquariuslt/Downloads/test.jpg';
var cookie = '';


var options = {
  host:'42.121.76.203',
  port:443,
  path:'/file',
  method:'POST',
  encoding:'utf8'
};

uploader.postFile(options,jpgFilePath,{
  Cookie:cookie
},function(error,res){
  if(error){
    console.log(error)
  }
  console.log(res.body);
});
