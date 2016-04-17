```metadata
{
  "title": "ExtJS-Experience",
  "date": "2015-10-02 00:10:22",
  "tags": ["ExtJS","JavaScript"]
}
```



# ExtJS Experience

## 前言
前几个月用前端用的比较多的ExtJS,正好趁能够重新写的部分将之前的ExtJS代码逻辑重新整理一下.
由于使用的版本是ExtJS 4.2, 只有里面的store才有数据绑定的概念.直到ExtJS 5 才出现ViewModel这种MVVM的概念,所以我在写代码的时候遵守的是ExtJS MVC的规约,尽量将View和Controller分开,抽取所有逻辑在Controller或者组件方法重写中.

主要自己总结出来的几个地方:

> * ExtJS MVC结构
> * ExtJS 在本项目中用到的常用组件控制
> * ExtJS 自定义组件




## MVC结构

### ExtJS的MVC组成
ExtJS的MVC结构实际上全是Model(Store),View,Controller.
与基本的MVC概念还多出了一个Store的概念.
其实Store主要的作用(至少在我项目中是这么用的)有如下几个:
  - 提供Model与后台服务端之间的数据读取代理(场景:下拉列表的自动完成)
  - 提供Model在UI上的表格组件的双向绑定(场景:表格的上的数据绑定)

### ExtJS MVC代码结构
以一个带有城市查询功能的注册页面来说,一个完整的ExtJS MVC代码结构应该是这样:

```
|-register
|--controller
|---RegisterController.js
|--model
|--store
|---CityStore.js
|---CountryStore.js
|---CountyStore.js
|---StateStore.js
|--view
|---RegisterView.js
|-RegisterApp.js
```
可以看到 model不是必须的,其实store也不一定会需要,视乎实际场景需要.

在MVC结构之下,在html引入js文件的时候,需要注意顺序.
大概是所有`Model`,`Store`,`View`,`Controller`,最后才到`App.js`

原因是在ExtJS MVC结构之下,整个html的body部分其实都是由ExtJS来渲染的,
所以将整个MVC交给Ext的application去管理.
而`App.js`则是负责整个application的实际需要文件的加载,和当前页面默认View的渲染

来看一下`RegisterApp.js`的代码

```JavaScript
Ext.application({
    name:'Register',
    appFolder:'/js/register',

    views:[
        'RegisterView'
    ],
    controllers:[
        'RegisterController'
    ],
    stores:[
        'CityStore',
        'CountyStore',
        'CountryStore',
        'StateStore'
    ],
    launch:function(){
        Ext.create('Register.view.RegisterView').show();
    }
});
```

上面的意思是当加载`RegisterApp.js`之后,会做以下事情:
> 1. 根据`name:'Register'`去加载对应的MVC组件
> 2. 以RegisterView作为初始页面去渲染

第一点中说明`name:'Register'`的作用主要是作为 app 的名字
定义了name之后,查找model,view,controller,store,都是通过代码中
ExtJS定义的 name+(model/view/store/controller)+自定义组件名 来定位对应的组件.

比如在上面`RegisterApp.js`中加载了
```JavaScript
views:[
    'RegisterView'
]
```
实际上RegisterView.js中的代码是下面这样的:
```JavaScript
Ext.define('Register.view.RegisterView',{
    extend:'Ext.container.Viewport',

    initComponent:function(){}
}
```
同理,自定义`model`,`store`,`controller`也是这样.


### MVC组件基本说明
定义`model`,`view`,`store`,`controller`等组件,都需要继承ExtJS本身的组件
下面还是以Register界面做例子,说明一下controller,view,store

#### View
View需要继承`Ext.container.Viewport`,
之后重写initComponent方法来编写界面上的组件与布局.
这里`Ext.applyIf`的意思是,不仅仅是重写方法,而是在原有的方法上做部分的替换和覆盖,在applyIf的作用域没有定义到的变量/值,则从所继承的组件中获取
如果用`Ext.apply`则是强行覆盖,与Git的force push意思差不多.

```JavaScript
Ext.define('Register.view.RegisterView',{
    extend:'Ext.container.Viewport',

    id:'RegisterViewPort',
    itemId:'RegisterViewPort',

    layout:{
        type:'hbox',
        align:'middle',
        pack:'center'
    },

    initComponent:function(){
        var self=this;
        Ext.applyIf(self,{
            //components
        });
        self.callParent(arguments);
    }
});
```

#### Controller
Controller需要继承`Ext.app.Controller`
通过复写init方法,在control()内部指定对应的选择器的组件,在对应的事件发生的时候要执行的方法
在这个controller.js中,表明了:
> 1. 当id为cancelRegisterButton的组件,在点击的时候执行`jumpToLoginPage`方法.
> 2. 当id为registerButton的组件,在点击的时候执行`registerCompanyAndUser`方法

```JavaScript
Ext.define('Register.controller.RegisterController',{
    extend:'Ext.app.Controller',

    init:function(application){
        this.control({
            "#cancelRegisterButton":{
                click:this.jumpToLoginPage
            },
            "#registerButton":{
                click:this.registerCompanyAndUser
            }
        });
    },

    jumpToLoginPage:function(){
            window.location.href=ctx+"/login";
    },


    registerCompanyAndUser:function(){
        var self=this;

        //1.Validate
        var validateFlag = self.validateRegisterForm();
        if(!validateFlag)return ;

        //2.Collect data and submit
        self.collectRegisterFormData();
    },
}
```

### Store
Store需要继承`Ext.data.Store`组件

Store需要配合model使用,或者直接在store中以field来定义model
在下面这份代码里面,`CityStore`主要的作用是为了提供一些城市的下拉列表

大致内容是:
当一个组件(Combobox下拉菜单/GridPanel表格面板)指定了CityStore作为Store的时候,
通过ajax方式访问后台 `/rest/location/city/list`的地址获取城市列表
其中返回的格式以`application/json`格式解析成json.
以json数组中的 id,code,name的键值对构建成store的内部model.

```JavaScript
Ext.define('Register.store.CityStore',{
    extend:'Ext.data.Store',

    storeId:'CityStore',
    autoLoad:false,
    fields:[
        'id',
        'code',
        'name'
    ],
    proxy:{
        type:'ajax',
        url:ctx+'/rest/location/city/list',
        reader:{
            type:'json'
        }
    }
});
```

### 效果预览

![Register](http://7xn6p8.com1.z0.glb.clouddn.com/register-city-autocomplete.gif)

## 常见组件效果

> 待更新,可能是一个列表


## 自定义组件
一些主要的自定义的一些组件,需要配合后台使用.
在自定义组件的时候,其实最主要是去官方文档查看到底这个轮子需不需要造,在确定需要造轮子之后,还要考虑这个轮子的可复用范围.
所以我自定义一些组件的时候,主要也是通过查看ExtJS对应组件源码的实现,复写当中的一些方法,达到效果


### AllowBlankCombobox
**允许为空的下拉列表**
#### 背景
在需要用下拉列表,以及其自动完成功能的时候,为了防止用户输入错误的值,
后台匹配不到对应的id,通常会在combobox组件下添加`forceSelection:true`,
使得用户输入错误的时候,自动返回到上一个选择.

但是这样问题来了,用户一旦在可编辑的下拉列表输入了任意值之后,就再也不能将该combobox留空.
一旦留空,就会返回到上一个选择的值.

> 通过研究这部分的源码,发现源码中直接把空的情况也当当做所谓的乱输入了.因为在源码中如果 调用`findRecordByDisplay(value)`一旦没有对应的record也被等同是用户胡乱输入.
> 所以就重写了assertValue方法,增加了判断为空的情况

#### 适用场景
需要强制用户在使用可编辑的下拉列表时 选择任意auto-complete出来的值或者设成空


```JavaScript
Ext.define('Ext.component.AllowBlankCombobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.allowblankcombobox',

    assertValue: function () {
        var me = this,
            value = me.getRawValue(),
            rec, currentValue;

        if (me.forceSelection) {
            if (me.multiSelect) {
                if (value !== me.getDisplayValue()) {
                    me.setValue(me.lastSelection);
                }
            } else {


                rec = me.findRecordByDisplay(value);
                if (rec) {
                    currentValue = me.value;


                    if (!me.findRecordByValue(currentValue)) {
                        me.select(rec, true);
                    }
                } else {
                    if(me.getRawValue() == ''){
                        me.setValue('');
                    }
                    else {
                        me.setValue(me.lastSelection);
                    }
                }
            }
        }
        me.collapse();
    }
});
```
### UniqueTextField
**唯一值文本框**
#### 适用场景
其实这个使用范围挺广,但是我现在这样写泛用泛用性不高.
主要是使用了异步校验的方式来校验email,username之类是否能使用.

> 实现上跟ptype不一样,因为ptype还需要另外自定义一遍.
> 所以还是使用onchange就触发的validator来执行
> 将值通过Ajax发送到后台校验,然后通过field.markInValid方法来进行invalid的校验.




```JavaScript
Ext.define('Ext.component.UniqueTextField',{
    extend:'Ext.form.field.Text',
    alias:'widget.uniquetextfield',
    msgTarget:'side',

    duplicateType:'',

    //vtype:'alphanum',


    validator:function(){
        var self=this;
        if(null==self.duplicateType||self.duplicateType==''){
            return true;
        }
        return self.validateByDuplicateType(self.duplicateType);
    },


    /*
    *    Default Configuration
    *    can override and customize it.
    *
    * */
    validateEmailUrl:ctx+'/rest/user/validate/email',
    validateCompanyNameUrl:ctx+'/rest/user/validate/companyName',
    validateUserIdUrl:ctx+'/rest/user/validate/userId',

    validateByDuplicateType:function(duplicateType){
        var self=this;
        var validateValue=self.getValue();
        var validateUrl=function(){
            if(duplicateType=='email')return self.validateEmailUrl;
            else if(duplicateType=='userId')return self.validateUserIdUrl;
            else return self.validateCompanyNameUrl;
        };

        var validateFlag=true;
        //start tip area masking
        Ext.Ajax.request({
            url:validateUrl,
            method:'GET',
            timeout:6000,
            params:{
                fieldValue:validateValue
            },
            success:function(response){
                var responseMessage=Ext.decode(response.responseText);
                //remove tip area masking and show the validate result
                if(responseMessage.status=='success'){
                    validateFlag=true;
                }
                else{
                    validateFlag=responseMessage.reason;
                    self.markInvalid(validateFlag);
                }
            }
        });

        return validateFlag;
    }

});
```
### CustomDateField
**自定义存取与后台格式匹配的datefield,datecolumn**

#### 背景
因为项目CRUD经常需要将页面上的时间存取成与后台匹配的数据格式,所以就自己定义了一些
前后端匹配互相转换的组件.没什么参考意义,只是觉得在View里面每一个`datefield`,`datecolumn`都通过`render:function()`的方式去写转换逻辑太不优雅了

```JavaScript
Ext.define('Ext.component.DateField',{
    extend: 'Ext.form.field.Date',
    alias: 'widget.customdatefield',//不使用驼峰是因为 Component 名默认就是全小写
    format:'Y-m-d:Hi',
    altFormats:'YmdHis.u',
    displayFormat:'Y-m-d',
    valueFormat:'YmdHis.u',
    initComponent: function() {
        var self=this;
        var value = this.value ||Ext.Date.clearTime(new Date());
        value = Ext.Date.format(value,self.format);
        this.callParent();
        this.value = value;
    },

    onSelect:function(field,value){
        var self=this;
        self.setValue(Ext.util.Format.date(value,self.valueFormat));
        self.callParent(arguments);
    },
    setValue:function(value){
        var self=this;
        self.callParent(arguments);
    },
    getValue:function(){
        var self=this;
        var dateString=Ext.Date.parse(self.getRawValue(),self.format);
        var returnValue=Ext.util.Format.date(dateString,self.valueFormat);
        return returnValue;
    }
});
```

## 总结
通过这段时间的项目学习,无论是前端还是后端都开始有了更深一层的认识.
从不知道如何实现,到如何实现得优雅,贴合框架本身,不造无谓轮子的角度来看,可以总结出一些使用ExtJS的经验.


### 多看官方文档
[官方文档](http://docs.sencha.com/extjs/4.2.2/#!/guide/application_architecture)
不要看所谓的`脚本娃娃`之流的汉化版.缺经断骨,看了还以为ExtJS本身没有这个方法或者事件,需要自己去实现呢
在了解已有API功能的情况下再尝试增加新的轮子
### 多横向比较
大半年前接触ExtJS的时候,当时觉得使用ExtJS的产品比较少,市场占有率少,感觉像是学了个并没有什么卵用的技术.

跟之前接触的AngularJS,与普遍的JQuery相比,当然没有一些方便的功能.
但是当我接触了JavaScript OOP编程,了解到prototype等概念之后,我开始感觉到ExtJS强大的类库与组件的使用也是相当好的JavaScript的学习时机.
得益于idea本身的代码分析功能,自动找出代码中复写到的ExtJS组件的部分,让我开始阅读其组件的源码实现,获益良多.
对JS的认识进展得相当快.

通过了解其他不同的前端框架,不管是阅读还是实际取去用,增加一下技术广度 后面就不会逼逼这项技术好low了.


通过了解其他不同的前端框架,不管是阅读还是实际去用,增加以下技术广度,后面就不会逼逼