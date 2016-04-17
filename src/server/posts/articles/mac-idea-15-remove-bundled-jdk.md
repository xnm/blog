```metadata
{
  "title": "Mac OS X下替换IDEA15自带的JDK",
  "date": "2016-01-15 23:19:44",
  "tags": ["Java","IntelliJ IDEA"]
}
```


## Background

由于最近一直在研究不同版本的JDK/JVM在不同操作系统下的字体渲染.(强迫症)
发现`Mac`下的`IDEA`在更新到15之后,字体居然变粗了.
从个人审美的角度看.觉得渲染不是很好看.
通过菜单的`About IntelliJ IDEA`查看.
发现启动运行`IDEA`的居然是`OpenJDK`.
![OpenJDK启动IDEA](https://img.alicdn.com/tfscom/TB1H_y2LpXXXXXWXXXXXXXXXXXX.png)

## Solution
解决办法相当简单.
这是因为`IDEA`的Mac版本,在版本15之后在包内容下自带了个JDK/JRE.
从启动的脚本来说,如果有内置的JDK/JRE,则会调用自带的JDK.

在`应用程序`中右键`显示包内容`,进入`Contents`文件夹,删除`jre`文件夹即可.
删除即可

![OracleJDK启动IDEA](https://img.alicdn.com/tfscom/TB1xn1VLpXXXXcpXXXXXXXXXXXX.png)