```metadata
{
  "title": "Mac下修改MySQL编码",
  "date": "2015-08-07 15:24:28",
  "tags":["OSX","Mac"]
}
```


Windows/Mac 配置大不同,还没熟练操控ide的配置文件,回家经常搞半天.周末写不好代码心思都没了..
1.关闭mysqld进程
2.进入MySQL安装路径
一般在 usr/local/mysql/ 下

[![0C574640-B1A9-4FE9-81DD-E0BC18079A4F]()
3.修改my.cnf配置文件
添加两行:

default-character-set=utf8
character-set-server=utf8
![FF373523-398E-4421-BBEE-3764CDA16C93]()


坑没完.你看看改了MySQL本身编码之后,之前创建的数据库并没有自动更改数据库级别的编码.
在MySQL控制台输入命令:
![28A1F66B-B3FD-4190-BC7D-E767394A049A]()
还是latin1..
4.修改已经存在的数据库的编码
alter database sms CHARACTER SET UTF8;
![9C6AEF66-E163-4F8C-BEAF-E4C0C7265E90]()

