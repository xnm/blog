```metadata
{
  "title": "IntelliJ IDEA 技巧系列:安装后常见环境配置 [入门]",
  "date": "2015-11-24 23:17:07",
  "tags": ["IntelliJ IDEA"]
}
```





以后推送的技巧系列文章,会在前面加一个实用系数标记,
大概可以分成下面几种
> `入门` 可视为弱智级别,适合完全没上手过的童鞋,用过一段时间的自动忽略
> `进阶` 进阶技巧,我觉得真实用的才会标记成进阶,适用范围时而小众[推荐]
> `转载` 转载官网的或者Tips中的实用技巧
> `实战` 实战经验[推荐]



## 背景: Why IntelliJ IDEA
大学的时候,时间花费在WOW上.
特别是在录制视频的时候,觉得没有一个好看的UI与插件布局,风骚的走位与操作都体现不出来.
于是开始折腾插件与界面美化.

界面美化,很重要一部分是字体.
最后由游戏字体引发到Windows的字体渲染问题上.

当时早就不爽Eclipse了(其实我好像还是用过Eclipse写过Java Web..),
从UI上来讲:
> * 好好的字体设置只能选英文字体,然后在英文字体下的默认中文字体(宋体)会比英文小一截.
> * Eclipse内置字体渲染也是屎.学C的时候,有个C的IDE叫做C-Free.或者Code-Blocks.他们对Courier New的字体都支持的非常好,饱满,圆润. 可是在Eclipse上显示,间距太大还不能调节
> * 沉迷于代码格式化,为什么没有一个对齐线 辅助对齐代码 ?
> * Eclipse 检查代码 一旦有warning 就会在文件上多一个感叹号. 而且对压缩后的js hint支持还特别差,会一直有个红叉(查了好久也不知道为什么) 看着很烦
> * 当时写html的时候,Eclipse 是有一个 html的对比页面的.可是他的动态渲染 文件链接能力简直为0.动态生成的显示效果比屎还不如
于是我便尝试了当时流行的一些JavaIDE:NetBeans,JBuilder 结论就是**我草都丑哭了好吗**
这样一直提不起学Java的兴趣
直到后来学Android的时候,除了Eclipse with Android ADT之外,Google官方推荐使用的是`Android Studio`
立刻下了一个.感觉这个IDE相当有趣.
再到后来才开始了解这个IDE的公司`JetBrains`.
旗下的IntelliJ IDEA 旗舰版是目前号称`最智能的Java IDE`.
什么`Android Studio`,`WebStorm`,`PHPStorm`,`PyCharm`都是`IntelliJ IDEA`的子集
赶紧下了个来折腾.

果不其然,作为生产力工具.一个好的IDE能够确切提高Coding时候的乐趣.
至今,已经有快两年的使用IDEA的经验.
与以往的编程/学习体验相比,更像是从自行车换成了奥迪,非一般的感觉,我的电脑已经没有Eclipse了.
为了宣扬Idea大法,决定制作一系列的文章 分享使用Idea期间获取的有用的技巧.

> 世上必定存在大大,认为成功的程序员并不依靠IDE.
> 我从心底是赞成这个观点的
> 但是从生产力与用户体验的角度来说,好的IDE提高了生产力与编程体验
> 这与软件工程最终给用户带来的效果是一样的.为什么不让一个好的IDE来帮助自己呢?
> 我会用Vim,入门过emacs.可是因为UI太丑还没体验到他们的神奇之处就退烧了..所以使用Vim,emacs的大大我还是相当佩服的
> (前提は私覇気ああよりもそのあなたの仕事が優れています)


## 正文
言归正传,本文的主要内容是 安装之后的常见配置.
由于Idea的安装过程非常简单,基本是无脑下一步即可.
下面是一些常用的配置,(相对默认从其他IDE/文本编辑器迁移过来的一些配置)
通过菜单`File`->`Settings`打开配置页面,下面的配置都通过这里来实现
![Perferences](https://img.alicdn.com/tfscom/TB1fZYYKFXXXXbHXVXXXXXXXXXX.png)

### 字体
Windows下Idea默认的代码字体显示简直就是屎,不换都对不起自己眼睛.
其中字体在Idea里面默认分成三种全局型的字体:
`Appearance`:`系统UI字体`
`Code Font`:`文本编辑字体`
`Console Font`:`控制台输出字体``
#### 修改Appearance字体
`Appearance&Behavior`->`Appearance` 建议系统默认,这里只是告诉大家怎么改
![修改Appearance字体](https://img.alicdn.com/tfscom/TB180QqKFXXXXXHXXXXXXXXXXXX.png)

#### 修改文本编辑字体
`Editor`->`Colors&Fonts`
要使用自定义字体,先点击下图的Schema 先另存为一份 配置.才能够进行更改.
![修改文本编辑字体](https://img.alicdn.com/tfscom/TB1AEn3KFXXXXacXVXXXXXXXXXX.png)

编程字体当然推荐等宽字体,如果对字体有选择困难,建议阅读这篇文章.
[有那些适合用于写代码的字体?](https://www.zhihu.com/question/20299865?rf=22041107)

#### 修改控制台字体
跟上图一样,图中有一栏叫做Console Font的配置.从那修改即可.

### 显示行号
开启行号是必须的,不然报错怎么能快速查看行号?
`Editor`->`General`->`Appearance`,勾选`Show line number``
![显示行号](https://img.alicdn.com/tfscom/TB1TEjWKFXXXXcyXVXXXXXXXXXX.png)

### 修改键位
从Eclipse迁移过来Idea,如果用惯了Eclipse的话可能对Idea的键位不是很习惯.
实在受不了Idea默认键位的话,可以使用自己以前的Eclipse热键.
`Keymap`,从下拉框中选择Eclipse(or其他)
![修改键位](https://img.alicdn.com/tfscom/TB1e8_8KFXXXXcfXFXXXXXXXXXX.png)
> Thanks @James,还没想到有这么普遍的转型需求

### 开启字体滚轮缩放
`Editor`->`General`
![开启字体滚轮缩放](https://img.alicdn.com/tfscom/TB1wQH.KFXXXXaOXFXXXXXXXXXX.png)


### 修改默认文件编码
不管是中文还是英文的Windows.大部分的默认文本编码都是GBK,(什么简体中文版更有可能是Cp13252)
代码文件编码 非`UTF-8`带来的屁事就是多.曾经看到一位大大的博客,他以前在Github上跟队友合作写项目
其中有个队友用的是Windows,新加的源代码文件是GBK的编码,出现编译之后奇奇怪怪的结果.最后把那个队友`干掉`了.

`Editor`->`File Encodings`,
将`IDE-Encoding`,`Project Encoding`,`Default encoding for properties files`都修改成`UTF-8`.
![修改默认文件编码](https://img.alicdn.com/tfscom/TB1De.qKFXXXXX3XXXXXXXXXXXX.png)


## 小结

以后推送的技巧系列文章,会在前面加一个实用系数标记,
大概可以分成下面几种
> `入门` 可视为弱智级别,适合完全没上手过的童鞋,用过一段时间的自动忽略
> `进阶` 进阶技巧,我觉得真实用的才会标记成进阶,适用范围时而小众[推荐]
> `转载` 转载官网的或者Tips中的实用技巧
> `实战` 实战经验[推荐]

系列文章可以 通过点击标签:[IntelliJ IDEA](http://blog.aquariuslt.com/tags/IntelliJ-IDEA/) 获得.


Idea 系列文章纯属个人经验之谈,抛开技术部分的讲解其余全部带有非客观的个人色彩.
如有技术方面的错误,希望各位不吝提出并指正.感谢.
(如有其他方面的意识形态方面的意见,恕在下年轻气盛一意孤行,你可以说,但我不听.)


