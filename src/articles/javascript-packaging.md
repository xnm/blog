```metadata
{
  "title": "JavaScript Packaging",
  "date": "2016-02-22 23:40:49",
  "tags": ["JavaScript","Node.js"]
}
```


## Background

### History
在原始阶段接触HTML,CSS,JavaScript的时候.
对JavaScript的打包是没有概念的.
毕竟Happy Case都不能跑通,优化的事情就抛诸脑后了.
原始的HTML文件资源加载方式
```html
<html>
<head>
  <link href="" rel="stylesheet">
  <link href="" rel="stylesheet">
  <link href="" rel="stylesheet">
</head>
<body>
  <!-- Body Content-->
  <script type="text/javascript" src=""></script>
  <script type="text/javascript" src=""></script>
  <script type="text/javascript" src=""></script>
</body>
</html>
```
这种文件加载方式.第一个缺点就是需要加载多少个文件,写多少行文件的导入.
(很不幸我现在还有一个项目使用这样的文件加载方式,哈哈)


### Performance Tuning
后来确实遇到了一些需要前端优化的case.
Web前端性能优化来说,我遇到的case大概可以分成以下几种类型

#### HTML结构的优化
这点在使用ExtJS的过程中尤为明显,由于ExtJS采用了极端的界面渲染方式.
在ExtJS的View代码中,一个子组件,或者面板的创建.实际上会以近十倍的DOM节点数量增加.
在实际渲染成的界面之中.动态操作的非业务性DOM节点相当多.
对于前期使用ExtJS官方推出的那个Sencha鸟蛋DreamViewer拖控件控制布局的方式,
拖出来的布局.就会有相当多的冗余结构.
随着业务代码的增多,这些冗余的视图层直接影响了JavaScript渲染DOM节点的时间.

映射到裸露的HTML代码也是一样.

#### 资源文件的优化
这点是看了Bootstrap的介绍才开始知道的.
他们将静态的资源文件.图标/字体 合成一个文件.
动态切割获取子元素.
后来在移动客户端那部分也遇到了很多类似的资源合并情况.

#### JavaScript逻辑的优化，模块化，异步加载，性能优化
这点就见仁见智了.
从程序员的角度来说,我觉得这都得基于有扎实的编程基础,对JavaScript本身特性有一定程度的了解才能够有资格谈得上优化.
自己在写代码的时候常见的JSHint约束的规范都做不到的话,恐怕还没资格去优化现有的程序.
谁知道会不会引发其他问题呢.
目前来说,将比较不科学的写法换成官方推荐的写法,不作负优化已经算是"JS性能优化"的明显手段之一了

#### HTTP请求的优化
从上面原始的HTML加载情况可以看出.
就算是原始的JS/CSS记载方式.的HTML写法本身是先将静态css逐个加载,再将js文件置于body标签底部进行加载.
在还没出现js文件打包合并之前,每个功能独立的js文件,在第一次加载的时候.都需要发送一次http请求.
N个js文件,就必须发送N个http请求.
如果不采用CDN,不做缓存的话.每次N个http硬性请求开销相当大


## JavaScript Packaging
于是在一些JavaWeb项目里面第一次接触到JavaScript文件合并,打包的概念.

### JAWR in JavaWeb
> [JAWR](https://jawr.java.net/)is a tunable packaging solution for Javascript
> and CSS which allows for rapid development of resources in separate module files.

遇到的第一个大型Java Web项目.
在表现层使用到的技术栈是`SpringMVC`+`JSF`+`ExtJS`.
按模块功能编写好ExtJS端的代码之后.通过JAWR的配置文件(可以是Properties+Web.xml加载,也可以与Spring集成,通过ApplicationContext配置)
配置好一个合并(压缩)后的URL对应的是开发代码中的哪一个模块的集合
在WebApp Server运行时将合并后的JavaScript代码释放出一个URL.通过该URL访问的实际上是合并后的js代码.
![JAWR加载过程](https://img.alicdn.com/tfscom/TB1y.E6LFXXXXceXFXXXXXXXXXX.png)


### Mean.js的JavaScript加载方式
作为单页web应用,`mean.js`官方DEMO提供了一些前端打包的构建脚本.
但是在还没使用打包脚本的时候,他也不是通过手动去维护`index.html`中应用到的JavaScript文件的.
而是通过扫描所有约定的前端的路径下的所有js,css等文件,暴露出该文件的url,使之可以被web请求反问道.
在批量替换到`index.html`中.
省去了手动维护`index.html`对所用到的js引用的过程而已.

### Webpack/Browserify
之前对JavaScript的认识的一部分说到Node.js的模块加载方式.
参考文章之一 [深入Node.js的模块机制](http://www.infoq.com/cn/articles/nodejs-module-mechanism)

贴出其中的一段内容:
CommonJS规范

> 早在Netscape诞生不久后，JavaScript就一直在探索本地编程的路，Rhino是其代表产物。
> 无奈那时服务端JavaScript走的路均是参考众多服务器端语言来实现的，在这样的背景之下，一没有特色，二没有实用价值。
> 但是随着JavaScript在前端的应用越来越广泛，以及服务端JavaScript的推动，JavaScript现有的规范十分薄弱，不利于JavaScript大规模的应用。
> 那些以JavaScript为宿主语言的环境中，只有本身的基础原生对象和类型，更多的对象和API都取决于宿主的提供，所以，我们可以看到JavaScript缺少这些功能：
> - JavaScript没有模块系统。没有原生的支持密闭作用域或依赖管理。
> - JavaScript没有标准库。除了一些核心库外，没有文件系统的API，没有IO流API等。
> - JavaScript没有标准接口。没有如Web Server或者数据库的统一接口。
> - JavaScript没有包管理系统。不能自动加载和安装依赖。
> - 于是便有了[CommonJS](http://www.commonjs.org)规范的出现，其目标是为了构建JavaScript在包括Web服务器，桌面，命令行工具，及浏览器方面的生态系统。

CommonJS制定了解决这些问题的一些规范，而Node.js就是这些规范的一种实现。
Node.js自身实现了require方法作为其引入模块的方法，同时NPM也基于CommonJS定义的包规范，实现了依赖管理和模块自动安装等功能。

所以当希望前端的代码以类似Node.js的方式一样实现模块加载,在打包JavaScript的时候,就需要用到一些JS打包的lib.
目前流行的打包方式有webpack,browserify等.

#### Browserify
以Webpack为例子,先对一个js文件进行打包

文件A:
```js
var headerController = require('./controllers/header.controller');
var homeController = require('./controllers/home.controller');
var pictureSlideController = require('./controllers/picture.slide.controller');
var activitiesController = require('./controllers/activities.controller');

var activityArrayFilter = require('./filters/activity.array.filter');
var activityPublishFilter = require('./filters/activity.publish.filter');

var homeRoutes = require('./routes/home.routes');
var template = require(dest);
var angular = require('angular');


//add sub module entries


module.exports = angular.module('home',[
  'ngAnimate',
  'ngResource',
  'ui.bootstrap',
  'ui.router',
  template.name
]).config(homeRoutes)
  .controller('homeController',homeController)
  .controller('headerController',headerController)
  .controller('pictureSlideController',pictureSlideController)
  .controller('activitiesController',activitiesController)
  .filter('activityArrayFilter',activityArrayFilter)
  .filter('activityPublishFilter',activityPublishFilter)
;
```
文件B:
```js
/** Created by Aquariuslt on 2016-01-15.*/
'use strict';

var async = require('async');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser();
var _ = require('lodash');

module.exports = function activitiesController($scope,$http){
  $scope.atomList = [];
  $scope.activitiesEntryArray =[];
  $scope.activities = [];



  init();


  function init(){
    async.series([
      resetData,
      initAtomList,
      initActivitiesList
    ],function(error,result){
      console.log('error:',error);
      console.log('result',result);
    });
  }

  function resetData(callback){
    $scope.atomList = [];
    $scope.activitiesEntryArray =[];
    $scope.activities = [];
    callback();
  }

  function initAtomList(callback){
    console.log('initAtomList');
    $http({
      url:'/api/rss/activities',
      method:'GET'
    }).then(function success(response) {
      $scope.atomList = response.data;
      callback();
    }, function error() {
      $scope.atomList = [];
      callback()
    });
  }

  function initActivitiesList(callback){
    console.log('initActivitiesList');
    async.each($scope.atomList,function(item){
      $http({
        url:item,
        method:'GET'
      }).then(
        function success(response){
          console.log('getting response from ',item);
          xmlParser.parseString(response.data,function(error,result){
            if(!_.isEmpty(error)){
              console.log('convert xml to json error:',error);
            }
            $scope.activitiesEntryArray=$scope.activitiesEntryArray.concat(result.feed.entry);
          });
        },
        function error(){
          callback();
        }
      );
    },function(error){
      console.log('error in getActivities from atomList',error);
    });
  }
};


```


打包之后的文件片段:
P.S.此处打包 指的是仅仅用webpack完成js代码合并,打包的过程.
没有经过压缩,变量名替换等进阶选项.

```js

/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/** Created by CUIJA on 2015-11-16.*/
	'use strict';


	var headerController = __webpack_require__(11);
	var homeController = __webpack_require__(12);
	var pictureSlideController = __webpack_require__(13);
	var activitiesController = __webpack_require__(14);

	var activityArrayFilter = __webpack_require__(171);
	var activityPublishFilter = __webpack_require__(172);

	var homeRoutes = __webpack_require__(173);
	var template = __webpack_require__(174);
	var angular = __webpack_require__(1);


	//add sub module entries
	var demo = __webpack_require__(175);


	module.exports = angular.module('home',[
	  'ngAnimate',
	  'ngResource',
	  'ui.bootstrap',
	  'ui.router',
	  template.name,
	  demo.name
	]).config(homeRoutes)
	  .controller('homeController',homeController)
	  .controller('headerController',headerController)
	  .controller('pictureSlideController',pictureSlideController)
	  .controller('activitiesController',activitiesController)
	  .filter('activityArrayFilter',activityArrayFilter)
	  .filter('activityPublishFilter',activityPublishFilter)
	;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/** Created by Aquariuslt on 2016-01-15.*/
	'use strict';

	var async = __webpack_require__(15);
	var xml2js = __webpack_require__(18);
	var xmlParser = new xml2js.Parser();
	var _ = __webpack_require__(169);

	module.exports = function activitiesController($scope,$http){
	  $scope.atomList = [];
	  $scope.activitiesEntryArray =[];
	  $scope.activities = [];



	  init();


	  function init(){
	    async.series([
	      resetData,
	      initAtomList,
	      initActivitiesList
	    ],function(error,result){
	      console.log('error:',error);
	      console.log('result',result);
	    });
	  }

	  function resetData(callback){
	    $scope.atomList = [];
	    $scope.activitiesEntryArray =[];
	    $scope.activities = [];
	    callback();
	  }

	  function initAtomList(callback){
	    console.log('initAtomList');
	    $http({
	      url:'/api/rss/activities',
	      method:'GET'
	    }).then(function success(response) {
	      $scope.atomList = response.data;
	      callback();
	    }, function error() {
	      $scope.atomList = [];
	      callback()
	    });
	  }

	  function initActivitiesList(callback){
	    console.log('initActivitiesList');
	    async.each($scope.atomList,function(item){
	      $http({
	        url:item,
	        method:'GET'
	      }).then(
	        function success(response){
	          console.log('getting response from ',item);
	          xmlParser.parseString(response.data,function(error,result){
	            if(!_.isEmpty(error)){
	              console.log('convert xml to json error:',error);
	            }
	            $scope.activitiesEntryArray=$scope.activitiesEntryArray.concat(result.feed.entry);
	          });
	        },
	        function error(){
	          callback();
	        }
	      );
	    },function(error){
	      console.log('error in getActivities from atomList',error);
	    });
	  }
	};



/***/ }

```


打包过程:
首先webpack为了实现CommonJS的require规范
释放出一个负责加载模块的 `__webpack_require__(moduleId)`函数.
接着对每个js文件都进行编号.
最后将每个js文件中用到的 `require(moduleName)`替换成自己的模块加载函数`__webpack_require(刚刚编号过的js文件编号)`
在打包过程中,先会按照成绩解析依赖关系,如果该模块从头到尾都没有被使用过,这不会将该模块打包进去.
66666

```js
(function(modules) { // webpackBootstrap
	// The module cache
	var installedModules = {};
	// The require function
	function __webpack_require__(moduleId) {
		// Check if module is in cache
		if(installedModules[moduleId])
			return installedModules[moduleId].exports;
		// Create a new module (and put it into the cache)
		var module = installedModules[moduleId] = {
			exports: {},
			id: moduleId,
			loaded: false
		};
		// Execute the module function
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		// Flag the module as loaded
		module.loaded = true;
		// Return the exports of the module
		return module.exports;
	}
	// expose the modules object (__webpack_modules__)
	__webpack_require__.m = modules;
	// expose the module cache
	__webpack_require__.c = installedModules;
	// __webpack_public_path__
	__webpack_require__.p = "";
	// Load entry module and return exports
	return __webpack_require__(0);
})
```




### Preview
Webpack等打包工具作为目前主流的前端打包工具(这个是我在2015年接触到的.可能现在又多了一批吧,日新月异的前端写法与多样化的工具).
原生附带了各种打包时候的Option,与二次开发的插件库.

接下来准备介绍目前的建站项目.


