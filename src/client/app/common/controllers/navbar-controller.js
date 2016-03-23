/** Created by Aquariuslt on 2016-03-19.*/
'use strict';

module.exports = function navbarController($scope){
  $scope.isFabMenuOpen = false;
  $scope.toggleFabMenuOpen = function(){
    $scope.isFabMenuOpen = !$scope.isFabMenuOpen;
  };


  $scope.subSiteList=[
    {
      name:'Blog',
      link:'http://blog.aquariuslt.com',
      description:'Tech Blog'
    },
    {
      name:'Debug',
      link:'http://debug.aquariuslt.com',
      description:'Debug Log'
    },
    {
      name:'Game',
      link:'http://game.aquariuslt.com',
      description:'WoW Daily'
    }
  ];

  $scope.featureList =[
    {
      name:'Chat Room',
      link:'#/features/chatroom',
      description:'Online chatroom using socket.io + redis'
    }
  ]
};