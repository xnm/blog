```metadata
{
  "title": "Linux搭建OpenFire服务",
  "date": "2014-05-20 10:44:16",
  "tags": ["Linux","Openfire"]
}
```


## Background
上周老师讲解了基于XMPP协议的即时通信应用概念，下面套用百度资料解析XMPP。

中文全称:可扩展通讯和表示协议

简介:可扩展通讯和表示协议 (XMPP)

可用于服务类实时通讯、表示和需求响应服务中的XML数据元流式传输。XMPP以Jabber协议为基础，而Jabber是即时通讯中常用的开放式协议。XMPP is the IETF's formalization of the base XML streaming protocols for instant messaging and presence developed within the Jabber open-source community in 1999 XMPP（可扩展消息处理现场协议）是基于可扩展标记语言（XML）的协议，它用于即时消息（IM）以及在线现场探测。它在促进服务器之间的准即时操作。这个协议可能最终允许因特网用户向因特网上的其他任何人发送即时消息，即使其操作系统和浏览器不同。 XMPP的前身是Jabber，一个开源形式组织产生的网络即时通信协议。XMPP目前被IETF国际标准组织完成了标准化工作。标准化的核心结果分为两部分； 核心的XML流传输协议 基于XMLFreeEIM流传输的即时通讯扩展应用 XMPP的核心XML流传输协议的定义使得XMPP能够在一个比以往网络通信协议更规范的平台上。借助于XML易于解析和阅读的特性，使得XMPP的协议能够非常漂亮。 XMPP的即时通讯扩展应用部分是根据IETF在这之前对即时通讯的一个抽象定义的，与其他业已得到广泛使用的即时通讯协议，诸如AIM，QQ等有功能完整，完善等先进性。 XMPP的扩展协议Jingle使得其支持语音和视频。

## 安装OpenFire
1.下载地址：[http://www.igniterealtime.org/downloads/index.jsp#openfire](http://www.igniterealtime.org/downloads/index.jsp)

![]()

选择Linux版本下载，我这里下载tar.gz文件。

2.上传到服务器上

因为下载的是要解压的文件，所以上传到 /opt/ 文件夹下

![]()

之后用
````
tar –zxvf openfire_3_9_3.tar.gz
````

解压

3.在MySQL中添加数据库openfire

#mysql –u root –p 登陆后

创建数据库

````
create database openfire;
````

导入对应的数据库文件
````
use openfire;
source /opt/openfire/resources/database/openfire_mysql.sql
````

4.启动openfire服务

![]()

&nbsp;

启动之后，现在可以通过你的域名/IP的9090端口访问openfire了。

[http://aquariuslt.com:9090](http://aquariuslt.com:9090)

1.  配置openfire参数
第一次进入这个9090端口的页面之后，是一个首次安装的页面

![]()

进入下一页，也是继续到数据库设置页面

数据库我们选择外置的数据库连接，也就是MySQL，因为刚刚已经在MySQL里面建立了数据库

![]()

将数据库URL中的[host]改成自己的IP或者域名,也可以设做localhost

将[databasename]改成自己的数据库名字

用户名和密码填写MySQL的用户名和密码

下面的设置 不必多说，按照自己的喜好设定即可。

![]()

现在登陆到管理控制台。

登录名固定为admin密码是刚刚你设置的管理员密码（一个邮箱账号+自己设定的密码，就是这个密码）

Tips:因为Linux默认不开放1000以上的端口，如果在操作这部分的时候，发现9090端口不能访问，用netstat也找不到9090端口，使用下面的语句打开9090端口
````
/sbin/iptables -I INPUT -p tcp --dport 9090 -j ACCEPT</pre>
````

## 开启9090端口


至此，安装配置Openfire完成。