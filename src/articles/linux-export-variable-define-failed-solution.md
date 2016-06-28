```metadata
{
  "title": "Linux 用export 声明临时环境变量失败的方法",
  "date": "2014-06-15 13:06:21",
  "tags": ["Linux"]
}
```



上次用export 声明了JAVA_HOME 和CLASSPATH和添加了一个PATH下的变量使得jdk指向正确，后来发现重启之后
用echo $PATH 命令查不到对应的路径

原来，用export 声明的环境变量是临时的，鸟哥私房菜没认真看逗比了.

解决方法


1. 切换到root账户


2. 用命令gedit /etc/environment 打开环境变量修改，假设我的jdk路径是 /home/aquariuslt/jdk


那么在打开的文件中
输入如图


![]()

保存关闭

3. 在终端输入 gedit /etc/profile

修改如图

![]()

然后重启才能生效
