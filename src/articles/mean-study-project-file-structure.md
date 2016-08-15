```metadata 
{  
  "title": "MEAN笔记:项目结构解读",
  "date": "2015-11-01 23:29:51",
  "tags": ["Node.js","AngularJS","Express","MongoDB"]
} 
```





## Background

终于盼来公司下一代产品的技术转型,技术逐渐从J2EE转换到MEAN Stack.
虽然之后继续会做J2EE的Support和Development,但是接下来应该都把主要精力放在MEAN结构上.

正式开始项目前两三个月正式进入技术学习准备阶段.我的分工主要是接触项目 构建,部署,打包的一些应用.
>   从过往的经验来说,特别是项目结构的分类,MEAN现在还没有公认的成熟的文件结构布局方案
>   开发环境,生产环境的部署,与不同 也跟Java Web有一定区别
>   这些部分都是经验之谈,必然要有遇到过不同项目结构的才能够有比较深刻的认识
>   不然选型之后遇到别人刁难当前选型就没法理据服的说出当初决定的优缺点,配合业务使用的场景

通过比较几个Node.JS WebApp Generator 与 [MEAN.IO](http://mean.io)  的官方项目
记录下初步学习的时候对项目结构的认识.方便在接下来的开发当中能够对应的进化出更科学的结构.



## 项目比较

#### Express WebApp Generator
Express Generator 官方生成的项目结构如下(**当然没包括node_modules**)
```shell
Macbook:Express Aquariuslt$ tree -L 3
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade

7 directories, 9 files
```
> 如果用Java Web的角度来看,routes充当了URL Mapping的角色,通过几种常见的视图解析(jade,ejs,还有后面的swig)拼装 渲染成html配合 public下的静态放行资源.
> `app.js`是服务器启动需要加载的必要配置.
> 通过bin/www 脚本来启动 `app.js` 其目的只是为了分离一些基本的配置.
> 正由于这个结构非常容易理解




#### Yeoman


```shell
Macbook:Yo Aquariuslt$ tree -L 2
.
├── Gruntfile.js
├── app
│   ├── apple-touch-icon.png
│   ├── favicon.ico
│   ├── fonts
│   ├── images
│   ├── index.html
│   ├── robots.txt
│   ├── scripts
│   └── styles
├── bower.json
├── dist
│   ├── apple-touch-icon.9727d3c2.png
│   ├── bower_components
│   ├── favicon.b25e58c4.ico
│   ├── index.html
│   ├── robots.txt
│   ├── scripts
│   └── styles
├── package.json
├── server.js
└── test
    ├── index.html
    └── spec

```
> Yeoman的部署方式比较接近HEXO,通过grunt task将程序要用到的js打包构建到`dist`文件夹并启动app.
>

#### Mean.io Offical Demo

```shell
Macbook:MEANJS Aquariuslt$ tree -L 3
.
├── CONTRIBUTING.md
├── Dockerfile
├── LICENSE.md
├── Procfile
├── README.md
├── bower.json
├── config
│   ├── assets
│   │   ├── cloud-foundry.js
│   │   ├── default.js
│   │   ├── development.js
│   │   ├── production.js
│   │   └── test.js
│   ├── config.js
│   ├── env
│   │   ├── cloud-foundry.js
│   │   ├── default.js
│   │   ├── development.js
│   │   ├── local.example.js
│   │   ├── production.js
│   │   └── test.js
│   └── lib
│       ├── app.js
│       ├── express.js
│       ├── logger.js
│       ├── mongoose.js
│       ├── multer.js
│       ├── seed.js
│       └── socket.io.js
├── docker-compose.yml
├── gruntfile.js
├── gulpfile.js
├── karma.conf.js
├── manifest.yml
├── modules
│   ├── articles
│   │   ├── client
│   │   ├── server
│   │   └── tests
│   ├── chat
│   │   ├── client
│   │   ├── server
│   │   └── tests
│   ├── core
│   │   ├── client
│   │   ├── server
│   │   └── tests
│   └── users
│       ├── client
│       ├── server
│       └── tests
├── package.json
├── protractor.conf.js
├── public
│   ├── humans.txt
│   ├── lib
│   │   ├── angular
│   │   ├── angular-animate
│   │   ├── angular-bootstrap
│   │   ├── angular-file-upload
│   │   ├── angular-messages
│   │   ├── angular-mocks
│   │   ├── angular-resource
│   │   ├── angular-ui-router
│   │   ├── angular-ui-utils
│   │   ├── bootstrap
│   │   ├── es5-shim
│   │   ├── jquery
│   │   └── owasp-password-strength-test
│   └── robots.txt
├── scripts
│   ├── generate-ssl-certs.sh
│   └── reset-password.js
├── server.js
└── test.js

```
> 这里这是本次笔记的重点.
> 这是`mean.io`的官方demo.在这个项目里面,包含了使用MEAN技术栈开发的WebApp.
> 涵盖了基本CRUD,登陆注册,权限校验,数据查询等Web应用常用场景.
> 他的文件结构我也觉得相对来说容易看懂,并且应该能够很好的作为一个开发规范

### 精简mean.io项目结构

因为项目配置多且繁杂,对于我这种智商比较低的初次上手肯定没有那么容易走通全部流程,看明白其中的定义.
所以我在相同的项目结构上,进行了功能与类库的缩减.从能够看懂的结构开始,说说我的理解.
之后将会以一个练手的项目`零食管理系统-SnacksBar`进行一步一步的功能增加 [项目地址](https://github.com/Aquariuslt/Snacksbar)

#### 精简后的项目结构
当然这是没有bower_components与node_modules

```shell
Macbook:Snacksbar Aquariuslt$ tree -L 4
.
├── bower.json
├── config
│   ├── assets
│   │   ├── default.js
│   │   └── development.js
│   ├── config.js
│   ├── env
│   │   ├── default.js
│   │   ├── development.js
│   │   └── production.js
│   └── lib
│       ├── app.js
│       ├── express.js
│       ├── logger.js
│       └── mongoose.js
├── modules
│   └── home
│       ├── client
│       │   ├── app
│       │   ├── config
│       │   ├── controllers
│       │   ├── home.client.module.js
│       │   └── views
│       └── server
│           ├── controllers
│           ├── routes
│           └── views
├── package.json
├── readme.md
└── server.js
```

言归正传,开始说下我对这个项目结构的理解,从Java的视角去思考项目结构.
`server.js`作为程序入口



#### 包管理
`package.json`是node的包管理信息,`bower.json`这是前端的包管理信息.作用等同maven的`pom.xml`.

`package.json`
```json
{
  "name": "Snacksbar",
  "version": "0.0.1",
  "private": false,
  "author": "Aquariuslt",
  "description": "Snacksbar Management System",
  "homepage": "http://github.com/Aquariuslt/Snacksbar",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/Aquariuslt/Snacksbar.git"
  },
  "dependencies": {
    "body-parser": "~1.13.2",
    "chalk": "^1.1.1",
    "consolidate": "^0.13.1",
    "cookie-parser": "~1.3.5",
    "debug": "~2.2.0",
    "express": "~4.13.1",
    "file-stream-rotator": "0.0.6",
    "glob": "^5.0.15",
    "jasmine-core": "^2.3.4",
    "lodash": "^3.10.1",
    "method-override": "^2.3.5",
    "mongoose": "^4.2.3",
    "morgan": "~1.6.1",
    "serve-favicon": "~2.3.0",
    "swig": "^1.4.2"
  },
  "devDependencies": {
    "gulp": "^3.9.0",
    "gulp-livereload": "^3.8.1"
  }
}

```
简要解析下 用到的一些类库(**当然是我大概了解其功能的了**)
`body-parser`,`cookie-parser`,`express` Express 开发N件套,顾名思义是一些解析器.
`chalk`,用于帮助在控制台花式输出各种颜色的log
`lodash`,在此中的用处就是拼接json变量.将几份json形式的变量合并在一起.
`mongoose`,连接MongoDB的中间件
`swig`,一个前台的视图,相当于JavaWeb中的`ViewResolver`,有点像模板拼接.

`bower.json`
```json
{
  "name": "Snacksbar",
  "description": "Snacksbar Management System",
  "homepage": "http://github.com/Aquariuslt/Snacksbar",
  "license": "MIT",
  "dependencies": {
    "bootstrap": "~3",
    "angular": "~1.3",
    "angular-resource": "~1.3",
    "angular-animate": "~1.3",
    "angular-mocks": "~1.3",
    "angular-bootstrap": "~0.13",
    "angular-ui-utils": "bower",
    "angular-ui-router": "~0.2",
    "angular-file-upload": "1.1.5",
    "angular-messages": "~1.3.17"
  },
  "resolutions": {
    "angular": "~1.3"
  }
}

```

### 整体Workflow

整体的workflow大概便是:通过`node server.js`启动服务器,服务器加载配置,监听端口,运行.

#### 通过`server.js`启动服务器
`server.js`内容如下,只有短短两行.
```JavaScript
var app = require('./config/lib/app');
var server = app.start();
```


#### `app.start()` 监听端口,启动服务器
`app.js`内容如下,实际上是先通过初始化`express`的一系列配置
```JavaScript
'use strict';

var config = require('../config');
var express = require('./express');
var mongoose = require('./mongoose');


function init(callback) {
  console.log("Init server environment configurations.");
  mongoose.connect(function (db) {
    var app = express.init(db);
    if (callback) {
      callback(app, db, config);
    }
  });
}

function start(callback) {
  var self = this;
  self.init(function (app, db, config) {
    app.listen(config.port, function () {
      console.log("----Environment Settings----");
      console.log("Port:" + config.port);
      if (callback) {
        callback(app, db, config);
      }
    });
  });
  console.log("Server Start");
}

module.exports.init = init;
module.exports.start = start;
```

#### `express.init()` Express的初始化
`express`也是启动的启动的配置文件之一,可以将express的初始化过程看做服务器端的启动过程:
经过简化之后,服务器启动的过程可以分成如下几部:(并不是纯翻译,而是方法名本身就代表了其意义)
1. initLocalVariables(app);         `加载全局环境配置`
2. initViewEngine(app);             `加载视图渲染`
3. initMiddleware(app);             `加载中间件`
4. initModulesConfiguration(app);   `加载模块配置`
5. initModulesClientRoutes(app);    `加载浏览器端路由`
6. initModulesServerRoutes(app);    `加载服务器端路由`


```JavaScript
var config = require('../config');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var consolidate = require('consolidate');
var logger = require('./logger');
var methodOverride = require('method-override');

function initLocalVariables(app) {
  app.locals.title = config.app.title;
  app.locals.description = config.app.description;
  app.locals.host = config.host;

  app.locals.jsFiles = config.files.client.js;
  app.locals.cssFiles = config.files.client.css;
  app.locals.livereload = config.livereload;


  // Passing the request url to environment locals
  app.use(function (req, res, next) {
    res.locals.host = req.protocol + '://' + req.hostname;
    res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
    next();
  });
}

function initSession(app, db) {

}

function initViewEngine(app){
  app.engine('server.view.html',consolidate[config.templateEngine]);

  app.set('view engine','server.view.html');
  app.set('views','./');
}

function initMiddleware(app){
  app.use(morgan(logger.getFormat(), logger.getOptions()));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
}

function initModulesClientRoutes(app){
  app.use('/',express.static(path.resolve('./bower_components')));

  config.folders.client.forEach(function (staticPath) {
    console.log("Client Route:"+staticPath);
    app.use(staticPath, express.static(path.resolve('./' + staticPath)));
  });
}

function initModulesServerRoutes(app){
  config.files.server.routes.forEach(function (routePath) {
    require(path.resolve(routePath))(app);
  });
}

function initModulesConfiguration (app, db) {
  config.files.server.configs.forEach(function (configPath) {
    require(path.resolve(configPath))(app, db);
  });
}

function init(db) {
  var app = express();
  initLocalVariables(app);
  initSession(app, db);
  initViewEngine(app);
  initMiddleware(app);
  initModulesConfiguration(app);
  initModulesClientRoutes(app);
  initModulesServerRoutes(app);
  return app;
}


module.exports.init = init;
```

##### 加载全局环境配置
`initLocalVariable()`方法主要是将配置文件读取 并且防止到app中作为运行时可获得的环境变量.
```JavaScript
function initLocalVariables(app) {
  app.locals.title = config.app.title;
  app.locals.description = config.app.description;
  app.locals.host = config.host;

  app.locals.jsFiles = config.files.client.js;
  app.locals.cssFiles = config.files.client.css;
  app.locals.livereload = config.livereload;


  // Passing the request url to environment locals
  app.use(function (req, res, next) {
    res.locals.host = req.protocol + '://' + req.hostname;
    res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
    next();
  });
}
```

因为config是从`config.js`里面抽取出来的,先看看`config.js`里面做了什么操作.
因为WebApp通常会分成生产环境,开发环境等不同environment.
所以config主要分成`development`,`production`两种.
在config中手修改填写对应配置,或者通过函数根据运行时参数决定执行的是哪一种配置.

在config的代码中,他会遍历搜索`assets`与`env`文件夹下的配置(虽然是js文件,但是通过`exports`返回的是一个json格式的变量),
然后根据对应的环境变量(一般是`development`或`production`),将其与`default.js`中的变量融合在一起.
接着将融合之后的一个json内容作为总的配置,传给`app`作为参数使用.


> 这里的融合(merge)相当有趣,是一个很方便的轮子.
> 它能够将 两份配置文件,相同的父节点下的子节点合并,最终融合成一个新的节点.
> 举个例子:
> 融合两个json A与B
> A:
```json
{
 "name":"Aquariuslt",
 "level":100,
 "skills":[
   "愤怒","星火术"
 ]
}
 ```
> B:
```json
{
 "item-level":"655",
 "skills":[
   "星涌术"
 ]
}
 ```
> 融合成
```json
{
  "name":"Aquariuslt",
  "level":100,
  "item-level":"655",
  "skills":[
    "愤怒","星火术","星涌术"
  ]
}
```




`config.js`
```JavaScript
'use strict';

var lodash = require('lodash');
var glob = require('glob');
var chalk = require('chalk');
var path = require('path');
var defaultConfig = require('./env/default');
var environmentConfig = require('./env/development') || {};
var defaultAssets = require('./assets/default');
var environmentAssets = require('./assets/development')||{};

function validateEnvironmentVariable() {
  var environmentFiles = glob.sync('./config/env/' + process.env.NODE_ENV + '.js');
  if (!environmentFiles.length) {
    if (process.env.NODE_ENV) {
      console.error(chalk.red('Error: No configuration file found for "' + process.env.NODE_ENV + '" environment using development instead'));
    } else {
      console.error(chalk.red('Error: NODE_ENV is not defined! Using default development environment'));
    }
    process.env.NODE_ENV = 'development';
  }
  // Reset console color
}

function initGlobalConfig() {
  //merge assets
  var assets = lodash.merge(defaultAssets,environmentAssets);
  //merge config
  var config = lodash.merge(defaultConfig, environmentConfig);
  console.log("Merge config complete");
  validateEnvironmentVariable();
  //set other config
  initGlobalConfigFolders(config,assets);
  initGlobalConfigFiles(config,assets);
  return config;
}

function initGlobalConfigFolders(config) {
  // Appending files
  config.folders = {
    server: {},
    client: {}
  };

  // Setting global client paths
  config.folders.client = getGlobalPaths(path.join(process.cwd(), 'modules/*/client/'), process.cwd().replace(new RegExp(/\\/g), '/'));
}

function initGlobalConfigFiles(config, assets) {
  config.files = {
    server: {},
    client: {}
  };

  config.files.server.models = getGlobalPaths(assets.server.models);
  config.files.server.routes = getGlobalPaths(assets.server.routes);
  config.files.server.configs = getGlobalPaths(assets.server.config);
  config.files.server.sockets = getGlobalPaths(assets.server.sockets);
  config.files.server.policies = getGlobalPaths(assets.server.policies);
  config.files.client.js = getGlobalPaths(assets.client.lib.js, 'bower_components/').concat(getGlobalPaths(assets.client.js, ['bower_components/']));
  config.files.client.css = getGlobalPaths(assets.client.lib.css, 'bower_components/').concat(getGlobalPaths(assets.client.css, ['bower_components/']));
  config.files.client.tests = getGlobalPaths(assets.client.tests);

  console.log("assets.server.routes:"+assets.server.routes);
  console.log("config.files.server.routes:"+config.files.server.routes);
  console.log("config.files.client.js:"+config.files.client.js);
  console.log("config.files.client.css:"+config.files.client.css);
}

function getGlobalPaths(globPatterns, excludes) {
  // URL paths regex
  var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

  // The output array
  var output = [];

  // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
  if (lodash.isArray(globPatterns)) {
    globPatterns.forEach(function (globPattern) {
      output = lodash.union(output, getGlobalPaths(globPattern, excludes));
    });
  }
  else if (lodash.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    }
    else {
      var files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map(function (file) {
          if (lodash.isArray(excludes)) {
            for (var i in excludes) {
              file = file.replace(excludes[i], '');
            }
          }
          else {
            file = file.replace(excludes, '');
          }
          return file;
        });
      }
      output = lodash.union(output, files);
    }
  }

  return output;
}


module.exports = initGlobalConfig();
```


##### 加载视图解析器
`initViewEngine()`方法主要是提供`Express`使用的视图解析器.
其实这个概念跟Java SpringMVC 中的视图解析器非常相似.
在Spring MVC 的配置文件中,启用视图解析器 一般是通过下面这段配置:
```xml
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="prefix" value="/WEB-INF/views/"/>
    <property name="suffix" value=".jsp"/>
</bean>
```
这就是最常见的,也是默认的`InteralResourceViewResolver`.
上面这段xml的主要内容是,当URL Mapping要返回的是一个视图的时候,将会根据要返回的视图的名字`{view-name}`,
去`/WEB-INF/views`文件夹下,查找一个名字为`{view-name}`,后缀为`.jsp`的文件.
即拼接成`/WEB-INF/views/{view-name}.jsp`的文件作为基本视图,再拼接一些返回过去的model等attribute渲染成实际的页面效果.

同理,下面这份初始化视图解析器的代码,内容如下:
首先,解析一下变量`consolidate[config.templateEngine]`,其值为 `swig`.
表明,以`server.view.html`作为文件后缀的,都以`swig`类型的解析方法作为视图解析.
然后,将默认的视图解析 设置成`server.view.html`类型.
最后,选择URLMapping对应的视图解析模板的根目录,表明将从该目录开始寻找视图模板.
```JavaScript
function initViewEngine(app){
  app.engine('server.view.html',consolidate[config.templateEngine]);

  app.set('view engine','server.view.html');
  app.set('views','./');
}
```
> `Express`中,常见的视图类型有`ejs`,`jade`,`swig`等.
> 其中`jade`与`ejs`作为`Express`的默认视图解析器
> `jade`的特点是,像编写配置文件一样去写html,然后变量通过server端传过来替换,但是并不适合只熟悉html编码的前端与后端整合
> `ejs`其实与`swig`有点像,都基本是html格式,外加特定的变量解析符号.类似于jsp的jstl标签替换.
> `swig`则是之前接触`HEXO`的时候遇到的一种,与普遍的swig文件拼接相同,(窝猜可能是就是用C去实现的)`



##### 加载中间件
经过简化之后的`initMiddleware` 其实只做了几个功能:
启动logger(指定了log的一些格式)
启动express的配套组件`bodyParser`(这部分还没看懂,sorry)

```JavaScript
function initMiddleware(app){
  app.use(morgan(logger.getFormat(), logger.getOptions()));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
}
```
> 根据个人理解,目前认为中间件大部分的作用是一种 类似切面编程的概念,即在代码中添加方便,可插拔的功能


##### 加载加载模块配置,服务器端与客户端所有路由

这三个方法放在一起说吧
三个方法,其实都是修改了 app内部的变量值,
通过扫描`config.js`中的内容,将路径以数组形式添加到app的环境变量里.

`config/assets/default.js`中涉及转化的部分
```JavaScript
module.exports = {
  client: {
    lib: {
      css: [
        dest,
        dest
      ],
      js: [
        'bower_components/angular/angular.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-messages/angular-messages.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-ui-utils/ui-utils.js',
        'bower_components/angular-bootstrap/ui-bootstrap.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-file-upload/angular-file-upload.js',
        dest
        ],
      tests: ['bower_components/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/css/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/home/client/app/config.js',
      'modules/home/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gulpConfig: 'gulpfile.js',
    allJS: [
      'server.js',
      'config/**/*.js',
      'modules/*/server/**/*.js'
    ],
    models: 'modules/*/server/models/**/*.js',
    routes: [
      'modules/!(home)/server/routes/**/*.js',
      'modules/home/server/routes/**/*.js'
    ],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: 'modules/*/server/config/*.js',
    policies: 'modules/*/server/policies/*.js',
    views: 'modules/*/server/views/*.html'
  }
};

```
实际上就是讲 client和server的`routes`文件夹下的所有文件扫了一遍,将其相对路径,放进环境变量的数组中.

```JavaScript
function initModulesClientRoutes(app){
  app.use('/',express.static(path.resolve('./bower_components')));

  config.folders.client.forEach(function (staticPath) {
    console.log("Client Route:"+staticPath);
    app.use(staticPath, express.static(path.resolve('./' + staticPath)));
  });
}

function initModulesServerRoutes(app){
  config.files.server.routes.forEach(function (routePath) {
    require(path.resolve(routePath))(app);
  });
}

function initModulesConfiguration (app, db) {
  config.files.server.configs.forEach(function (configPath) {
    require(path.resolve(configPath))(app, db);
  });
}

```
---


其实对MEAN.JS官方DEMO的项目结构还是非常的走马观花,接下来必须先开搞一下AngularJS才能够理解前端与后端的较好交互方式,方便下一步功能的添加.
将Java Server端的知识点与概念 转移到JavaScript方式去实现与使用,希望能够慢慢的加深面向对象语言的共同点,增强技术广度,突破现有的技术深度.



