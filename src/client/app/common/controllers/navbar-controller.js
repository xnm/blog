/** Created by Aquariuslt on 2016-03-19.*/
'use strict';

module.exports = function navbarController($scope) {
  $scope.isFabMenuOpen = false;
  $scope.toggleFabMenuOpen = function () {
    $scope.isFabMenuOpen = !$scope.isFabMenuOpen;
  };

  $scope.subSiteList = [
    {
      name: 'Blog',
      link: 'http://blog.aquariuslt.com',
      description: 'Tech Blog'
    },
    {
      name: 'Debug',
      link: 'http://debug.aquariuslt.com',
      description: 'Debug Log'
    },
    {
      name: 'Game',
      link: 'http://game.aquariuslt.com',
      description: 'WoW Daily'
    }
  ];

  $scope.featureList = [
    {
      name: 'Chat Room',
      link: '#/features/chatroom',
      description: 'Online chatroom using socket.io + redis'
    }
  ];

  $scope.friendLinkRegisterLink = '#/friend-links';
  $scope.friendLinkList = [
    {
      name:'wxsm\'s blog',
      link:'http://wxsm.top',
      description:'Kary Gor博客,前端大神'
    },
    {
      name:'Goovier Blog',
      link:'http://goovier.com'
    },
    {
      name:'xgezhange博客',
      link:'http://xgezhang.com',
      description:'坚持更新的技术博客,实在难得'
    },
    {
      name:'lousama',
      link:'http://lousama.com',
      description:'为女人拒绝阿里的楼总'
    }

  ];
};