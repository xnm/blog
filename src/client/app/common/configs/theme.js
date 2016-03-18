/** Created by Aquariuslt on 2016-03-19.*/
'use strict';

/**
 * Config of angular-material themes.
 *
 * */

module.exports = function($mdThemingProvider){
  var whitePrimary = {
    '50': '#ffffff',
    '100': '#ffffff',
    '200': '#ffffff',
    '300': '#ffffff',
    '400': '#ffffff',
    '500': '#f6f6f6',
    '600': '#e9e9e9',
    '700': '#dcdcdc',
    '800': '#d0d0d0',
    '900': '#c3c3c3',
    'A100': '#ffffff',
    'A200': '#ffffff',
    'A400': '#ffffff',
    'A700': '#b6b6b6'
  };
  $mdThemingProvider.definePalette('whitePrimary', whitePrimary);




  //noinspection JSUnresolvedFunction
  $mdThemingProvider.theme('default')
    .primaryPalette('whitePrimary');
};