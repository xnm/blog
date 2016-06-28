```metadata
{
  "title": "IntelliJ IDEA 技巧系列:MEAN Stack 开发配置与常用插件",
  "date": "2015-12-03 10:16:29",
  "tags": ["IntelliJ IDEA","Node.js","JavaScript"]
}
```


## Background
> As best Java,JavaScript,MEAN Stack IDE,
> With useful MEAN plugin,
> IntelliJ IDEA helps you develop faster
> And get better coding experience.

作为JetBrains系列IDE的爸爸,与`WebStorm`不同的是,Idea在默认安装过程中,
默认只添加了Node.JS的支持.对于模块化JavaScript的支持(而非html内嵌JavaScript代码),
Idea还需要修改一些配置,更新一些插件来达成完美的MEAN Stack开发体验.

本文将从 MEAN 与 Common 配置两部分出发,介绍在开发过程中好评的插件.

## Common Useful Plugin
> 所有的Jetbrains系列插件,都可以通过 `File`->`Settings`->`Plugin`界面进行搜索安装
![Plugin Install UI](https://img.alicdn.com/tfscom/TB1Vlg.KFXXXXX8XVXXXXXXXXXX.png)

### .ignore
> 不同的版本控制工具(Version Control),一般都有各自的忽略列表.
> 通过忽略列表匹配对应的文件.
> 来达到防止对不应该Commit的文件的提交.

`.ignore`是一款版本管理辅助插件.
我一般使用它的以下功能:
1. 根据模板自动生成对应版本控制工具忽略列表
![创建.gitignore文件](https://img.alicdn.com/tfscom/TB10mplKVXXXXbuXpXXXXXXXXXX.png)

2. 根据忽略列表对文件名进行 灰度颜色
灰度标记文件夹,时刻提升自己那个文件夹是 (Build出来的/临时文件/lib) 不必人工改动.
![文件忽略灰度标记](https://img.alicdn.com/tfscom/TB1mZxzKVXXXXXoXXXXXXXXXXXX.png)

### Grep Console
> 查看控制台输出的时候,经常会忽略一些Exception,Error,Warning
> 因为他们在控制台中跳得太快,而且不显眼
> 当出现Exception需要快速定位问题的时候,查找log的效率一定程度上决定了debug的效率.

`Grep Console`是一款控制台润色插件.
我主要使用它的润色功能:
默认情况下,`Grep Console`会对每一行输出的关建字进行检索.
该行出现`ERROR,FATAL,EXCEPTION`的时候会对该行进行红色润色
该行出现`WARNING`的时候进行黄色润色.
这样就可以快速翻滚追踪到这个信息

![根据特定规则对特定行列润色标记](https://img.alicdn.com/tfscom/TB1JNXeKVXXXXbWXFXXXXXXXXXX.png)

![Grep Console 配置界面](https://img.alicdn.com/tfscom/TB1czdxKVXXXXXEXXXXXXXXXXXX.png)

### Batch Script Support(Bash Support)
> 大多数项目都会有自己的自动构建/部署脚本.
> 在`Mac`,`Linux`下通常是Shell脚本
> 在`Windows`下通常是cmd,bat脚本

`Batch Script Support(Bash Support)`(分别是两个插件,但是功能大相径庭)
是一款能够快速执行脚本的插件.
> 一般我们是在对应系统的`Terminal`里面call这个脚本就行了.
> 搞笑?这个功能不是没什么卵用吗

**别闹**,像Windows这些渣渣自带的Terminal去跑bat,cmd输出有颜色吗?
设置的`Buffsize`太小还会吃掉最上一部分的内容
所以这里就要配合上面的 `Grep Console`配合使用了.

![添加脚本文件到Run Configuration 一键运行](https://img.alicdn.com/tfscom/TB1hrhwKVXXXXaRXXXXXXXXXXXX.png)

## MEAN Stack Support Plugin

### Node.js Global Support
`Node.JS`集成功能本来在安装Idea的时候就自带了这集成,不过有时候不小心会被取消掉.
在编辑JavaScript代码的时候,如果用到了`Node.js`的原生API而没有配置`Node.JS`的提示的时候.
写起来就比较烦心.

> 在这里先提及一下 Idea的`Libraries in Scope`功能:
> `Libraries in Scope`是指当前编辑的JavaScript代码实际调用的函数库.
> 对于代码分开存储,使用`bower`,`npm`管理第三方JavaScript代码库的动态链接相当使用.

![查看当前编辑文件的Scope Libraries](https://img.alicdn.com/tfscom/TB14fk8KFXXXXb6XVXXXXXXXXXX.png)

如果开启`Node.js`的提示?
0. 在插件中安装`Node.js`集成.
> 这一步估计大多数人都有,可以跳过

1. 添加项目的`Node.js`全局支持

`File`->`Settings`->`Languages & Frameworks`->`Node.js and NPM`
![添加Node.js全局提示](https://img.alicdn.com/tfscom/TB1m7A9KFXXXXbrXVXXXXXXXXXX.png)

### AngularJS Support/CSS Library Support
> 当所引用的JS,CSS文件并不在源代码文件夹内
> Idea原本是不能提示的
> 但是如果将所需的第三方lib添加到`Libraries in Scope`中,就可以

还是在当前编辑文件的右下角,打开`Libraries in Scope`窗口->`Add`添加Library
![打开Libraries窗口](https://img.alicdn.com/tfscom/TB1JSRyKVXXXXXYXXXXXXXXXXXX.png)

![添加实际文件](https://img.alicdn.com/tfscom/TB1m.s_KFXXXXaxXVXXXXXXXXXX.png)

![添加github上提供的第三方lib](https://img.alicdn.com/tfscom/TB1dRtjKVXXXXXeXFXXXXXXXXXX.png)

### Mongo Plugin
Idea官方自带的关系型数据库插件非常强大,但是对于`MongoDB`则支持不是很好.
集成MongoDB的第三方插件,叫做`Mongo Plugin`.
![不是很好用的Mongo Plugin](https://img.alicdn.com/tfscom/TB1y9Q9KFXXXXaWXVXXXXXXXXXX.png)

其实个人比较推荐 另一个MongoDB 可视化工具,叫做`Robomongo`

### Live Edit
还记得之前Adobe出过一款叫`Brackets`的软件,前端开发修改源代码页面自动刷新的一改即可见的能力.
非常强大.
`Live Edit`其实也实现了这个功能.篇幅关系这里不详细讲,仅仅提及这个功能,且因为我只是在Chrome里面
实验过,还没有深刻的体会.

启动`Live Edit`功能之后,相当Chrome里面的html,js映射到源代码上来.
Idea内部直接与Chrome的开发控制台连接,修改源代码等同在Chrome的开发者控制台中修改.

## Summary
其实Idea上还有一些比较常见的插件,但是需要结合实际的开发场景,决定是否**Useful**.