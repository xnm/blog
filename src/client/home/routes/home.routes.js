/** Created by Aquariuslt on 2015-11-17.*/
'use strict';

function homeRoutes($stateProvider) {
  // Home state routing
  $stateProvider
    .state('home', {
      url:'',
      templateUrl: 'home/views/home.index.html'
    })
    .state('about',{
      url:'/about',
      templateUrl: 'home/views/home.about.html'
    })
    .state('ag-grid',{
      url:'/demo/ag-grid',
      templateUrl: 'demo/ag-grid/views/simple.array.html'
    })
  ;
}

module.exports = homeRoutes;