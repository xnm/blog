```metadata
{
  "title":"Vue Version Blog App",
  "created":"2017-05-05",
  "category":"Blog",
  "tags":["Blog","Vue","PWA"]
}
```

## Change Log

这篇文章写于 2017-05-05. 下面一部分没实现的功能已经基本实现，并且做了更多的配置外化工作.

详情将会发布到新的一篇文章里面.



## Background

在阅读过Vue的官方文档之后,我尝试用其为一个数据可视化项目的图表做一个Refine,以寻求渲染性能与响应变化上性能的提升,与更细致,可自定义的动画效果.

虽然Vue是一个渐进式的前端框架,但是突然想以Vue全家桶去实现一次Angular1.x项目中所有的功能,于是便以自己的Blog App作为一个初始项目进行练手.

从四月份开始进行Vue的学习,目前Vue版本的Blog App已经实现了[@Angular版本](https://github.com/Aquariuslt/Blog/tree/NG2)的所有功能.  

记录一下中间的历程.

根据目前所做的工作,

代码放在[Vue分支](https://github.com/Aquariuslt/Blog)上.  

## Features

目前实现的功能有:

- Single Page Application [单页应用]
- Progressive Web Application [渐进式网页应用]
- Markdown Writing [使用Markdown进行写作]
- Support Code Highlight [支持代码高亮]
- Disqus [支持Disqus评论]
- Configurable [抽取配置到独立的配置文件]
- Sitemap auto generating [自动生成Sitemap]


中间有一些跌坑之后还在纠结于没找到优雅的解决方案的地方:
- No Support Pre-rendering [不支持预渲染]
> 为单页应用进行预渲染,生成对应的静态index.html,可以有效被搜索引擎收录
> Vue本身支持webpack的`prerender-spa-plugin`. 但`Vue-Material`的菜单展开方式是动态渲染的,所以目前还不能做到预渲染.(这里跌了几天的坑)
> 目前部署在Github Pages上的话会没有SEO. 因为SPA在搜索引擎爬的时候会先返回一个404,再根据Github的约定返回404.html. 搜索引擎就把该url当成失效的链接.
> 部署在VPS上的话支持SEO.


## Development

### Dependencies
为了实现与Angular版本相同的效果,才用的Vue全家桶 + 其他主要的库是
- Vue [2.3.2]
- Vuex
- Vue-Router
- VueMaterial
- Axios [前后端通用的http请求框架]
- Marked [Markdown解析部分]
- Hightlight.js [为Markdown的代码片段渲染出高亮效果]

### Development Course

从头到尾,大概的功能开发思路是如此的:

1. 阅读Vue + Vuex + Vue-Router的文档
2. 学习Vue-Webpack Template中的项目结构与构建方式
3. 重写基于Marked的Markdown Post API
4. 确定基本的Gulp构建任务流
5. 以纯ES6的方式修改Webpack与Gulp任务流
6. 使用Vue全家桶完成基本界面开发
7. 重构应用部分的代码成模块化加载方式
8. 添加PWA,Sitemap等功能
9. 添加CI配置


## Usage & Document

参见: [Blog App Usage](https://github.com/Aquariuslt/Blog/tree/VUE#usage)



