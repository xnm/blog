```metadata
{
  "title": "IntelliJ IDEA 不能正常解析Node.js Core Modules 属性方法的解决方案",
  "date": "2016-03-22 13:45:25",
  "tags": ["Node.js","IntelliJ IDEA"]
}
```


## Background
`IntelliJ IDEA`更新到2016.01之后,在使用`Node.js`的原生API的时候,遇到了了一个问题:
不能够auto-complete出对应的属性方法:
比如以下的代码:

```js
var filePath = '/home/aquariuslt/Downloads/avator.png';
var path = require('path');
path.basename(filePath);
```
正常情况下是能够根据`Node.js`的API预定义文件`core_moudles`对方法名进行自动补全.
![正常情况](https://img.alicdn.com/tfscom/TB1c4XbMXXXXXX2aXXXXXXXXXXX.png)

更新之后居然不能自动提示了

## Solutions
有两个解决方案,分别对应不同的情况.
两个都试过了,分别在`Windows`,`Linux`下完成

### 重新Enable一次Node.js Framework Support
`File`->`Settings`->`Languages & Frameworks`
先disable掉Node.js
再enable.

![Languages & Frameworks Settings](https://img.alicdn.com/tfscom/TB1gHQ_LVXXXXXrapXXXXXXXXXX.png)


### 如果安装过不同版本的Node.js,删除不同版本的IDEA Node.js 定义文件
在User的个人目录`~`下
可能存放了不同IDEA版本,不同Node.js版本的配置文件

```shell
$ls -al | grep Idea

C:\Users\CUIJA>ls -al | grep Idea
drwxr-xr-x 1 CUIJA 1049089       0 Mar 21 18:38 .IntelliJIdea15
drwxr-xr-x 1 CUIJA 1049089       0 Mar 21 18:42 .IntelliJIdea2016.1
```

先删除旧的IDEA 版本的config文件夹.
再进入当前使用的IDEA版本的config文件夹

```shell
$cd .IntelliJIdea2016.1\config\javascript\nodejs
total 0
drwxr-xr-x 1 CUIJA 1049089 0 Mar 21 18:47 .
drwxr-xr-x 1 CUIJA 1049089 0 Mar 21 18:47 ..
drwxr-xr-x 1 CUIJA 1049089 0 Mar 21 18:47 4.3.1
drwxr-xr-x 1 CUIJA 1049089 0 Mar 21 18:47 4.4.0
```
删掉那个比较旧的文件夹 即可.