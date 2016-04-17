```metadata
{
  "title": "云服务器实战：aliyun服务器环境配置与管理",
  "date": "2014-06-15 11:42:30",
  "tags":["VPS","Linux"]
}
```



狠下心租了一个月aliyun的服务器作服务器端实战练习，55块钱的最低配置。

服务器系统：CentOS 6.4

在购买了服务器之后
你的注册邮箱会收到一封邮件


上面含有你购买的服务器的一些细节，如图


![]()<span style="color: black; font-family: Arial; font-size: 9pt;">


需要用到的如下


服务器IP：ServerIP（用ServerIP表示我的服务器地址
就不透露了）


默认用户名：root（默认的Linux用户名都是root）


初始密码：rootpwd（用rootpwd表示我的root密码）

那么，如何对已经购买的服务器进行操作，达到能运行网站应用的地步呢？

1. 首先要使用一个远程连接服务器，用命令行管理服务器的客户端软件。

我使用的是windows连接
服务器端的linux

所以推荐使用SecureCRT这款软件来连接服务器


百度搜索 SecureCRT 64位破解版
自行下载即可。


界面如下


![]()<span style="color: black; font-family: Arial; font-size: 9pt;">


2. 连接服务器


在SecureCRT界面
按下Alt+Q或者
点击左上角的快速连接


![]()<span style="color: black; font-family: Arial; font-size: 9pt;">


在主机名处填入自己的ip地址，就是ServerIP


用户名填root


回车连接之后，他会要求你输入密码，就是个人的初始密码rootpwd


如果一切完好
此时就会连接成功，进入服务器的终端界面，就是Linux下的终端。


使用方法与Linux终端完全一致，只不过没有了图形界面，环境配置可能会遇到点问题。


所以我们先来解决
用这个SecureCRT上传文件到服务器端的方法吧。


平时上传文件呢，大多数都是用FTP来传输，这样Linux客户端要安装FTP协议，我们这边也要安装多一个flashFXP客户端什么的，比较繁琐，直接用SecureCRT支持的上传


1. 首先，我们在服务器的终端安装sz/rz服务


终端输入

````
yum install lrzsz
````

安装完成。

2. 设置 windows本地的
上传/下载文件夹。

在SecureCRT 上方菜单中  选项--会话选项--终端--X/Y/Z modem 修改


![]()

比如说要上传一个JDK （因为JDK 用yum 来安装的话只能装openjdk貌似..）我们先把下载好的JDK-8-linux-x64.rpm放在
自己的G:下载
目录下


在服务器端
进入到要粘贴的文件夹，比如我在/home 下新建了一个叫做JDK的文件夹，我们cd进去


此时，点击传输
如图


![]()

点击Zmoderm上传列表，选择放在G:下载
下的要上传的文件
点击开始上传


然后服务器端就自动开始上传进程了。


大概的操作方式就是这些，如果是配置JSP开发环境的话
可以参考之前在本地虚拟机安装Ubuntu的配置方式。
