```metadata
{
  "title": "模块化JavaScript之我见",
  "date": "2016-01-27 22:02:55",
  "tags": ["JavaScript","AngularJS","Node.js"]
}
```



## Background
最近接触了`MEAN`相关技术栈和实际项目开发有一段时间.
在过程中公司同事也开展了多次Share Meeting去科普一些常见的技术点.
鉴于已经对模块化JavaScript有了一定的实践,本次总结一下我所理解的JavaScript模块化.

## JavaScript 发展历史
### 我的JavaScript践行史
对JavaScript的认识比较曲折,刚接触的时候觉得是一门乱来的语言.
为什么说他乱来,因为JavaScript有很多糟糕的特性.
当时体验到的最大的几个问题是:
1. 没有块级作用域名.
2. 隐式的全局变量.

> 对于第一点"没有块级作用域",摘录[JavaScript:The Good Parts]()一书.
> JavaScript的语法来源于C,在所有其他类似C语言风格的语言里,一个代码块 {} h会创造一个作用域.
> 在 {} 代码块中声明的变量在其外部是不可见的.
> JavaScript采用了这样的块语法.但没有提供块级作用域:
> 在JavaScript的代码块 {} 中声明的变量,在包含此代码块的函数的任何位置都是可见的.

> 对于第二点"隐式的全局变量",初衷可能是为了方便初学者,有意让变量在使用前无需声明,
> 而JavaScript解析器帮你自动识别并当做是全局变量.导致debug难度变大.

#### 学生时期:乱来
大学的时候有一门课大概是"Web开发".杂讲HTML/CSS/JS".
当时用到JS的情况是做一些简单的DOM操作,加一些简单的移动效果.
当时觉得JS可恶心了,还是因为JQuery这个库用了`$`符号作为window的全局变量.

> 在使用JS的时候,对JS特性没有了解.所有函数都是全局函数,通过传参数进去调用.
> 仅仅通过文件名的分割进行逻辑上的分成.

#### 实习时期:ExtJS 4.2
`ExtJS`对企业级应用相当有利.特别是 `ExtJS`,有着无比强大的Grid组件.
实习时期的项目,前端UI的渲染部分全部通过`ExtJS 4.2 MVC`完成.
在实际项目中的实践中,通过各种花式CRUD的case,了解整个`ExtJS`的常用API.

> 虽然功能能够按部就班地完成,但是还是有很多不符合`JSLint`中的地方
> 字面过很多JS的特性,并没有深刻的理解

#### 工作之后:ExtJS 3.3 + AngularJS 1.5
毕业之后换到了另一个组,由于项目开始时间更长一点,前端用的是跟`ExtJS 4.2`API有较大出入的`3.3`
此前做了几件对JS理解有质的飞跃的几件事情:
> 1. 因为一些业务需求,发现原生的`ExtJS`并没有符合需求的组件,
> 为了贴合需求,尽量以科学的方式编写代码
> 为`ExtJS`进行一些自定义组件的开发.
> 在编写过程中阅读了本身一些组件的源代码及实现
> 扩展了视野

> 2. 阅读了[JavaScript:The Good Parts]()一书.
> 这本书是`JSLint`作者之一,JS大师`Douglas Crockford`出品.
> 里面系统的吐槽了`JavaScript`的一些辣鸡特性,顺便为`JavaScript`的一些优点正名.
> 最后通过`JSLint`这个作品为`JavaScript`洗地,让我对`JavaScript`的认识上了一个层次.
> 其实就是说`JavaScript`是一门`抽烟喝酒纹身打架但他还是个好男人`的语言.(应该是基于成王败寇)
> 只要按照`JSLint`的规范,约束去编写代码,则能够使得代码更加健壮,优雅.


### 宏观JavaScript发展
宏观的JavaScript模块化发展历史,可以分成以下几个阶段:


#### 起源
起源: 在JS诞生之后的若干年,在项目发展到越来越大的时候,JS代码缺少一个科学有效的解决命名冲突,文件依赖解决方案.
以`将JS代码以文件形式分割`的落后约定.

那时候,所有的函数都是全局函数,只能靠命名来解决唯一性
```js
function refreshPage(){
  window.location.reload();
}

function showSubmitButton(){
  document.getElementById('submitFormButton').setAttribute('style','display:block');
}
```

#### Package命名方式

类似Java的包命名方式一样,使用多级的包命名
```
com.aquariuslt.utils.refreshPage = function(){

}
```
在`ExtJS 3.3`中要使用这种包命名的方式,则变成了
```
Ext.ns('com.aquariuslt');
com.aquariuslt.ui.bookingUi=Ext.extend(Ext.Viewport,{
   layout:'fit',
   initComponent:function(){
      var self=this;

      Ext.applyIf(self,{
         xtype:'container',
         items:[
            {
               xtype:'panel',
               ```metadata {  } ```"title":'Booking Search'
            }
         ]
      });
   }
});
Ext.reg('com.aquariuslt.ui.bookingUi',com.aquariuslt.ui.bookingUi);
```

在`ExtJS 4`中,则变成了
```
Ext.define('Booking.view.BookingCreateView',{
    extend:'Ext.container.Viewport',

    id:'BookingCreateViewPort',
    itemId:'BookingCreateViewPort',

    layout:'fit',


    initComponent:function(){
        var self=this;

        Ext.applyIf(self,{
            xtype:'container',
            items:[
                {
                    xtype:'panel',
                    id:'bookingPanel',
                    border:false,
                    layout:'border',
                    dockedItems:[
                        {
                            /*1.Booking Request Title*/
                            xtype:'panel',
                            dock:'top',
                            frame:true,
                            id:'bookingCreateHeaderPanel',
                            bodyCls:'allPadding',
                            border:false,
                            items:[
                                {
                                    xtype: 'container',
                                    region: 'north',
                                    cls: "pageTitleLevel leftRightPadding",
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'pageTitle',
                                            id: 'bookingCreatePageTitle',
                                            text: 'Booking Request - New'
                                        }
                                    ]
                                }

                            ]
                        }

                    ],
                    items:[
                        /*2.Carrier and Traffic Mode*/
                        {
                            xtype:'panel',
                            id:'bookingCreateCarrierInfoPanel',
                            frame:true,
                            ```metadata {  } ```"title":'Carrier',
                            cls:'allPadding',
                            region:'north',
                            border:false,
                            layout:'column',
                            items:[

                            ]
                        }


                    ]
                }
            ]
        });

        self.callParent(arguments);

    }
});
```
#### 闭包自执行
还有一种与`JQuery`风格的匿名函数自执行
```js
(function(window){
    window.jQuery = window.$ = jQuery;
})(window);
```

## JavaScript 模块化实践
关于JavaScript的模块化,我是从接触`Node.js`的编写方式之后才开始真正实践起来.


### AMD,RequireJS与CMD规范
> 此处AMD,RequireJS,CommonJS规范说明出自[前端模块化-Samaritans-博客园](http://www.cnblogs.com/dolphinX/p/4381855.html)

#### AMD 与 RequireJS
AMD 即`Asynchronous Module Definition`，中文名是异步模块定义的意思。它是一个在浏览器端模块化开发的规范

由于不是JavaScript原生支持，使用AMD规范进行页面开发需要用到对应的库函数，也就是大名鼎鼎RequireJS，实际上AMD 是 RequireJS 在推广过程中对模块定义的规范化的产出

requireJS主要解决两个问题

多个js文件可能有依赖关系，被依赖的文件需要早于依赖它的文件加载到浏览器
js加载的时候浏览器会停止页面渲染，加载文件越多，页面失去响应时间越长

#### CMD
CMD 即Common Module Definition通用模块定义，CMD规范是国内发展出来的，就像AMD有个requireJS，CMD有个浏览器的实现SeaJS，SeaJS要解决的问题和requireJS一样，只不过在模块定义方式和模块加载（可以说运行、解析）时机上有所不同

语法
Sea.js 推崇一个模块一个文件，遵循统一的写法

#### CommandJS

CommonJS是服务器端模块的规范，Node.js采用了这个规范。Node.JS首先采用了js模块化的概念。
根据CommonJS规范，一个单独的文件就是一个模块。每一个模块都是一个单独的作用域，也就是说，在该模块内部定义的变量，无法被其他模块读取，除非定义为global对象的属性。
输出模块变量的最好方法是使用module.exports对象。
```
var i = 1;
var max = 30;

module.exports = function () {
  for (i -= 1; i++ < max; ) {
    console.log(i);
  }
  max *= 1.1;
};

```
上面代码通过module.exports对象，定义了一个函数，该函数就是模块外部与内部通信的桥梁。
加载模块使用require方法，该方法读取一个文件并执行，最后返回文件内部的module.exports对象。





### Reference
> 1. [前端模块化的价值](https://github.com/seajs/seajs/issues/547)
> 2. [深入Node.js的模块化机制](http://www.infoq.com/cn/articles/nodejs-module-mechanism)