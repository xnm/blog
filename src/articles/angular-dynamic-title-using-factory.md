```metadata
{
  "title": "Angular单页应用动态切换页面标题",
  "date": "2016-04-03 22:27:24",
  "tags":["AngularJS","JavaScript"]
}
```


## Background

在运行angular单页应用的时候,有时候需要能够动态的根据当前的view来切换当前的标题.
JavaScript原生语法中,其实是可以直接利用`document.title='xxx'`来实现.

但是根据Kary Gor的建议,所有原生的DOM操作其实都建议在directive中进行.
所以参考StackOverFlow上的一个做法,实现动态切换当前页标题.

## Solution

总体的实现步骤分为以下几步:
1. 建立一个factory用于控制当前页标题
2. 建立一个controller,专门用于控制最上级html的header部分的操作
3. 在其他子controller,调用更变页面标题的方法

### 创建pageService
```js
/** Services for html page such as Header */

var angular = require('angular');
//noinspection JSCheckFunctionSignatures
var $injector = angular.injector(['ng']);
var $log = $injector.get('$log');
var _ = require('lodash');

var pageService = function pageService(){
  var svc = this;
  svc.defaultTitle = 'Aquariuslt Home';
  svc.title = svc.defaultTitle;

  function getTitle(){
    return svc.title;
  }

  function setTitle(newTitle){
    if(!_.isEmpty(newTitle)){
      svc.title = newTitle + ' - ' + svc.defaultTitle;
    }
    else{
      svc.title = svc.defaultTitle;
    }
    $log.info('set new title:',svc.title);
  }

  return{
    getTitle:getTitle,
    setTitle:setTitle
  };
};

module.exports = pageService;
```

### 创建pageController

page-controller.js:

```js
var pageService = require('../services/page-service')();

module.exports = function pageController(){
  var page = this;
  page.service = pageService;
};

```

index.html:

在html标签直接添加一个controller作为scope.
一开始是直接在`<title></title>`标签内直接使用`page.service.getTitle()`的.
但是发现在angular还没有加载完成的时候,默认的标题 会显示成这个表达式本身的字符串,非常丑陋.
于是用了`ng-bind`去绑定.在angular数据绑定还没生效的时候,使用原来的默认标题.

```html
<!DOCTYPE html>
<html lang="en" ng-app="home" ng-controller="pageController as page">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" href="http://blog.aquariuslt.com/images/avator.png">
  <base href="#">
  <title ng-bind="page.service.getTitle()">Aquariuslt Home</title>
  <!-- Load CSS Bundles Here -->
  <!-- CSS -->
</head>
<body>
  <header ng-include="'app/common/views/header.html'"></header>
  <ui-view></ui-view>
  <!-- Load JavaScript Bundles Here -->
  <!-- JS -->
</body>
</html>

```

### 其他子controller的调用方法
比如我有一个tag页面:
[http://aquariuslt.com/#/tag/Java](http://aquariuslt.com/#/tag/Java)

我需要将当前页面的标题前缀加上`Tag Contains Java`
则需要在这个页面的controller中这样调用:

```js
var pageService = require('../../common/services/page-service')();
var articleService = require('../services/article-service')();

module.exports = function tagController($stateParams,$interval){
  var vm = this;

  vm.atomList = [
    "http://blog.aquariuslt.com/atom",
    "http://debug.aquariuslt.com/atom",
    "http://game.aquariuslt.com/atom"
  ];
  vm.tagName = $stateParams.tagName;
  vm.indeterminateValue = 0;
  vm.showProgressBar = false;
  vm.tagDetailList = [];

  init();

  function init(){
    initTitle();
    loadTagDetail();
  }

  function initTitle(){
    pageService.setTitle('Tags Contains '+vm.tagName);
  }

  function loadTagDetail(){
    startInterval();
    articleService.loadArticleSummaryList(vm.atomList,function(error,summaryList){
      vm.tagDetailList = articleService.filterArticleListByTagName(summaryList,vm.tagName);
      stopInterval();
    });
  }

  function updateProgressBar(){
    if(vm.showProgressBar){
      vm.indeterminateValue += 1;
      if (vm.indeterminateValue > 100) {
        vm.indeterminateValue = 0;
      }
    }
  }

  function startInterval(){
    vm.showProgressBar = true;
    $interval(updateProgressBar, 100, 0, true);
  }

  function stopInterval(){
    vm.showProgressBar = false;
    $interval.cancel(updateProgressBar);
  }

};
```