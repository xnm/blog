```metadata
{
  "title":"Angular常规性能优化阶段总结",
  "date":"2016-04-30 15:33:50",
  "tags":[
    "Angular",
    "JavaScript"
  ]
}
```

## Background
还是上一篇[文章](http://aquariuslt.com/#/post/2016/04/26/what-i-have-done-these-days)里面讲到,
最近在为项目进行性能优化的时候,有总结到一些经验.  
现在梳理一遍,方便以后排查问题.  

## References
在进行Angular页面的性能测试以及学习优化手段之前,查阅了挺多资料.  
其中非常推荐一些前端大牛的博客文章,不仅在技术方面深有造诣,而且表达能力非常清晰,能够条理清晰地将经验传授给大家.  

下面是一些推荐阅读的博客,给我提供了很多帮助,加深了对Angular的认识.  
- [xufei blog](https://github.com/xufei/blog/)
...准备贴下一个地址的时候,居然发现这个知乎的地址居然也是xufei大大的回答.
恩.应该提供最有价值帮助的就是他了.


## Solutions

### Plugins:AngularJS Batarang
利用Angular官方开发的Chrome插件`AngularJS Batarang`来监控页面性能.  
[Angular Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)  
![运行截图](https://img.alicdn.com/tfscom/TB1OmxkKXXXXXXIXXXXXXXXXXXX.png)  

通过`Angular Batarang`,我们可以轻易的统计在页面的`watcher`数量,`$scope`中变量的数量.
还有平均一段时间内`angular`执行`$digest`的数量.

对于代码不熟悉的项目前端,查找分析性能瓶颈的时候,可以通过通过该插件进行二分对于,快速定位出瓶颈处.
当然,如果在对angular比较熟悉,在开发的过程中也遵循了常见的性能优化约定,该插件的监控作用就不大.
最后还是只能通过其他手段细化性能瓶颈定位粒度.

经过本人测试,对于大部分使用Angular的页面都支持良好.(可惜不支持CommonJS打包成的我的主站的分析)


### Once Binding
在常见的CRUD系统中,我们经常会遇到很多数据展示的区域,但是这些数据一旦渲染好,一般不需要强刷新.
比如页面标题,菜单选项等不需要实时更新的情况.所以这时候可以通过`Once Binding`,即一次绑定,渲染一次即可,不必监控该表达式.

之前遇到的情况是,我们的页面header会有一个通知栏,展开会通知那些已经显示的列表.  
单条通知样子类似于微博的这种:  
![通知栏(https://img.alicdn.com/tfscom/TB17PpkKXXXXXX8XXXXXXXXXXXX.png)
在没优化之前,通知部分的伪代码如下:
```html
<div class="notification">
  <ul>
    <li ng-repeat="notification in vm.displayNotifications">
      <div href="{{notification.targetUrl}}">
        <p>{{notifications.title}}</p>
        <p>{{notifications.summary}}</p>
        <p>{{notifications.time}}</p>
      </div>
    </li>
  </ul>
</div>
```
经过一轮生产环境数据统计,某部分用户的未读通知范围会在200 - 7W 条.  
哈哈看到就尿了,如果这么算的话,7W条的那个用户页面将会有至少 7W*4 = 28W的watcher在监听他们的变化.  
且不论数据为什么需要全部渲染出来,如果将代码修改成Once Binding,则页面的长期watcher数量将会减少28W个.

特别是对于使用了`ng-repeat`的元素,一定要考虑将

使用一次绑定表达式之后如下
```html
<div class="notification">
  <ul>
    <li ng-repeat="notification in vm.displayNotifications">
      <div href="{{::notification.targetUrl}}">
        <p>{{::notifications.title}}</p>
        <p>{{::notifications.summary}}</p>
        <p>{{::notifications.time}}</p>
      </div>
    </li>
  </ul>
</div>
```

### Use variable instead function expression


### Chain Filter


### Using ng-model delay update




## Summary


