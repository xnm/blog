/** Created by Aquariuslt on 2016-03-19.*/
'use strict';

module.exports = function($stateProvider){
  $stateProvider
    .state('chatroom',{
      url:'/features/chatroom',
      templateUrl:'app/feature/views/chatroom.html'
    })
};