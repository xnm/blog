```metadata
{
  "title": "IntelliJ IDEA 技巧系列:GitHub设置同步工程",
  "date": "2014-10-25 00:22:22",
  "tags": ["IntelliJ IDEA","Github"]
}
```



之前弄过一次  后来因为一直在本机开发，所以用的是本地的Git

通过IntelliJ IDEA + GitHub 管理代码仓库
更加方便的看到版本提交历史+更变详细对比，公司+宿舍+笔记本三方同步开发


一.事先准备

1.安装Git

Git下载: [http://git-scm.com/downloads](http://git-scm.com/downloads) 最新版本是2.1.2

2.注册GitHub账号

3.设置代理(可选)

GitHub有一定记录是被墙的...在公司里能用Chrome直接改hosts访问，但是用Idea就无法连接上。所以有必要使用代理、

GoAgent自己去搜一下下载啦

开启GoAgent代理之后，默认是127.0.0.1:8087 作为VPN的地址。


二.IntelliJ IDEA添加Git与GitHub支持

Idea本身就支持Git和GitHub，不过先要设置Git的位置和跟你的GitHub账号连接起来。

1.设置Git的路径

在Idea中，File-Settings-Version Control-Git 中，在右侧指定git.exe的位置
![]()

2.添加GitHub账号

2-0.在Idea中设置代理(可选)

Settings-HTTP Proxy中，在右侧选中Manual proxy configuration

host name 填127.0.0.1

Port number 填8087


![]()


2-1.设置GitHub账号

Settings-Version Control-GitHub

host填写github.com

Login和password 分别填写自己的GitHub账号密码

然后下面的Connection timeout 连接时长上限
修改成一个比较大的值
比如50000(输入完记得回车，不然设置没有生效)


![]()


然后尝试点Test

如果弹框如下，则说明连接成功。

![]()


三.同步工程


在同步工程之前，我先说说我对Git在版本管理方面的一些理解：

大概是这样:

1.一开始，先创建一个项目工程的初始版本A，然后通过Git生成一个仓库A

2.在A的基础上，进行多人协作开发/异地开发（这个其实上是一样的）的时候，先从仓库A那里同步，拿到最新版本的A的一份拷贝。这个动作成为Pull

![]()

3.拿到拿到仓库A的拷贝之后，程序员A和码农B负责编写不同的部分，反正不会修改到同一份代码文件，大部分情况是一部分负责做UI前端，另一部分负责做后台什么的。都是修改或者添加部分代码文件。

在做好自己的单元工作的话，大概会变成这样

![]()
4.这时候程序员A给自己修改后的整个工程项目
打了备注(commit)："程序员A，增加了XXX后台功能",码农B 给自己的整个项目工程
打了备注 "码农B, 用苹果风格美化了界面"，之后提交到本地Git仓库中。
此时本地的Git仓库
已经做好他们修改后的项目工程文件
与原来仓库A的文件对比，记录在Git记录中。

然后程序员A和码农B同时把自己做好的工程文件 push到远程的Git仓库中，远程的Git仓库就为仓库A添加了两个分支。


![]()

5.这时候，项目经理定时检查进度。

查看了AB的分支之后，决定他们两个这段时间的工作成果可以融合起来

就决定将这两个分支合并起来(merge)如果不合并起来，下次再开始修改
不知道要从谁的分支开始进行工作，从程序员A的那个分支进行工作，就会发现码农B的界面代码又成了没修改过的那部分，还要码农B再修改。这样就是加大工作量，这样也侧面反映出低耦合，MVC模式对于团队合作的优点之处。


![]()





四.通过GitHub同步

在了解了Pull,Push的意义之后，可以来通过Idea进行
本地仓库创建，然后Share到GitHub，进行pull和push

1.创建本地仓库

对于没有在GitHub上创建仓库的一个本地项目，首先要在本地中创建本地仓库

先选中整个项目目录，在菜单栏VCS-Git-Add  添加一个本地仓库


2.Share to GitHub

菜单栏VCS-Import into version control-share project on GitHub.
![]()


然后填写项目信息
回车
就能在你的GitHub主页创建一个新的开源项目，大概如下

![]()

3.Pull and Push

比如我在公司和宿舍都进行开发。每天下班不能搬着电脑回去吧，在单人开发的时候，这个是一个很好的同步方式。相当于云笔记那种功能。

当我快要下班的时候，我就把项目先添加备注，表示这次项目的Push之前，我对其进行了什么修改的简述。

我觉得这也是一个很好的版本功能更新记录。

![]()


添加了Commit之后，可以进行Push来上传修改后的分支

下图是push

![]()


4.在GitHub上查看版本更替记录

在你的GitHub上

现在可以看到相对于原始版本
有更新的每个地方的不同之处。
![]()

点击最上面的那部分查看，可以看修改了那些地方



![]()
