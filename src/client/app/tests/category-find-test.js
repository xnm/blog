/** Created by Aquariuslt on 4/3/16. */

var _ = require('lodash');




var categories = [
  {
    $:{
      term:'JavaScript'
    }
  },
  {
    $:{
      term:'Java'
    }
  }
];

console.log(_.find(categories,{
  '$':{
    'term':'Java1'
  }
}));