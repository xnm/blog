/** Created by Aquariuslt on 2016-03-19.*/
'use strict';

module.exports = function navbarController($state, $log) {

  var vm = this;

  vm.goState = goState;

  vm.isFabMenuOpen = false;
  vm.toggleFabMenuOpen = function () {
    vm.isFabMenuOpen = !vm.isFabMenuOpen;
    $log.info('isFabMenuOpen:', vm.isFabMenuOpen);
  };

  vm.isSubSiteMenuOpen = false;
  vm.toggleSubSiteMenuOpen = toggleSubSiteMenuOpen;

  vm.isFriendLinkMenuOpen = false;
  vm.toggleFriendLinkMenuOpen = toggleFriendLinkMenuOpen;

  vm.isFeatureListOpen = false;
  vm.toggleFeatureListOpen = toggleFeatureListOpen;

  function toggleSubSiteMenuOpen() {
    vm.isSubSiteMenuOpen = !vm.isSubSiteMenuOpen;
    $log.info('isSubSiteMenuOpen:', vm.isSubSiteMenuOpen);
  }

  function toggleFriendLinkMenuOpen() {
    vm.isFriendLinkMenuOpen = !vm.isFriendLinkMenuOpen;
  }

  function toggleFeatureListOpen() {
    vm.isFeatureListOpen = !vm.isFeatureListOpen;
  }

  vm.subSiteList = [
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

  vm.featureList = [
    {
      name: 'Markdown Editor',
      link: '#/features/md-editor',
      state: 'md-editor',
      description: 'Markdown Editor with simple features'
    }
  ];

  vm.friendLinkRegisterLink = '#/friend-links';
  vm.friendLinkList = [
    {
      name: 'wxsm\'s blog',
      link: 'http://wxsm.top',
      description: 'Kary Gor博客,前端大神'
    },
    {
      name: 'Goovier Blog',
      link: 'http://goovier.com'
    },
    {
      name: 'xgezhange博客',
      link: 'http://xgezhang.com',
      description: '坚持更新的技术博客,实在难得'
    },
    {
      name: 'lousama',
      link: 'http://lousama.com',
      description: '为女人拒绝阿里的楼总'
    },
    {
      name: 'NotFound404',
      link: 'https://github.com/404NoFound',
      description: '良哥的Github'
    }
  ];

  function goState(stateName) {
    $log.info('go state:',stateName)
    $state.go(stateName,{});
  }

};