```metadata 
{  
  "title": "vmware下为Ubuntu扩容",
  "date": "2015-12-30 23:40:11",
  "tags": ["Linux","vmware"]
} 
```



## Description

一时大意,本以为`vmware`下的虚拟机可以随便调整磁盘容量,于是在给有1T SSD的服务器建立`Ubuntu`虚拟机镜像的时候很傻比的只分了40G的最大容量.
没想到开发环境用的DB日渐增长,磁盘空间竟然很快消耗殆尽.

于是赶紧给通过`vmware`的虚拟机硬件设置给将最大磁盘空间升级到120G(依然很小气- -)

突然想起 Linux 的磁盘挂载方式 不大一样.上网找了一些类似的解决方案之后,都发现不太好记.


## Solution
通过`Ubuntu`下的一个GUI软件,叫`gparted`,能够图形化的类似Windows下的磁盘管理工具一样,进行磁盘空间的重新划分与转移.

在本次使用`gparted`进行分区转移,大概分成以下几步:

> 1. 安装并运行`gparted`
> 2. 删除`Ubuntu`下原本的extend分区及`linux swap`空间
> 3. 对原有磁盘空间进行扩容
> 4. 新建extend分区,建立`linux swap`空间

### 安装并运行`gparted`
```sh
$sudo apt-get install gparted
gparted
```

![gparted界面](https://img.alicdn.com/tfscom/TB1s16KLXXXXXXVXpXXXXXXXXXX.png)


### 删除`Ubuntu`下原本的extend分区及`linux swap`空间
> 这里提及一下之前有的错误做法
> 我一开始的做法是,直接给未格式化的空间,格式化之后,作为一个新的磁盘挂载在系统中
> 这样,需要对 /media/${username}/新空间名称 进行一个链接
> 才能达到扩容的目的.
> 感觉这样相当不优雅.像是乱插了N个奇形怪状的U盘在身上

研究后发现,`Linux`的Swap空间阻断了分区扩容,在磁盘起始点和终点上不连续.
所以先右键`File System`为`extend`的分区,删除之


### 对原有磁盘空间进行扩容
删除`extend`的空间之后,便可以对原有的`/dev/sda1`进行扩容.
此时右键`/dev/sda1`选择`resize`,在保证预留出大小相当于分配给虚拟机的内存的空间的情况下,分多点~
点击`apply`生效

### 新建extend分区,建立`linux swap`空间
最后,重新建立`linux swap`空间.
对着还未分配的空间,新增一个`file system`为`extended`的扩展分区,`apply`之.
然后在该分区下新建一个`linux-swap`空间.


![扩容后截图](https://img.alicdn.com/tfscom/TB1HPTxLXXXXXXoXVXXXXXXXXXX.png)





