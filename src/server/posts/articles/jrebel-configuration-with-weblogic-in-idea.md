```metadata
{
  "title": "IntelliJ IDEA通过Jrebel热部署管理Weblogic",
  "date": "2015-10-08 23:47:20",
  "tags": ["Weblogic","IntelliJ IDEA","Java"]
}
```


# idea通过Jrebel热部署管理Weblogic
> Skip the build and redeploy process. JRebel reloads changes to Java classes, resources, and over 100 frameworks.
> 以上这是Jrebel官网的介绍.Jrebel是一款热部署的IDE插件,(当然也可以脱离IDE直接使用)...
> 通过热替换正在运行的类文件,减少deploy项目的等待时间,是增加Coding乐趣,延长Coder生命,杀人越货必备良药.

## Background
> 由于公司的项目规模是在挺大(架构复不复杂我还没理清,反正项目结构很复杂).
> 每次deploy到weblogic上都要很多分钟,特别是后台代码的改动,必须要redeploy,一次就要3-5分钟,deploy的时候内存暴增,出来韩剧都播完一集了.
> 恰好公司买了Jrebel license.所以早会使用早超生

<b>本配置基于以下项目配置情况,仅供参考.</b>
`其实官网对普通的基本配置说的很详尽,只是因为我们的配置比较奇葩所以弄了挺久才懂`
> * 使用maven构建程序,而不是通过直接的java compiler编译代码,生成artifact.
> * 使用maven去call ant构建程序,还不是直接通过maven build呢,是maven插件去读取ant配置构建..
> * Weblogic的Server有自己定义的启动时类路径与固定参数
> * 原本部署在Weblogic是通过 weblogic redeploy命令重新部署的

<b>使用本配置之前的前置条件</b>
> * 安装好Weblogic,配置好项目需要的类路径,参数.
> * 安装好idea的Jrebel插件


## 原理浅析
`Jrebel`热部署的原理,实际上是通过修改JVM的类加载方式,即在java的vm参数里面使用`jrebel`自己的java agent,
然后在第一次编译,部署项目的时候,将生成的`rebel.xml`,放进项目target路径的classes目录下.
通过监听`rebel.xml`中对应路径的类/静态资源文件的变化,替换到运行中的已部署的项目目录.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<application xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns="http://www.zeroturnaround.com" xsi:schemaLocation="http://www.zeroturnaround.com http://www.zeroturnaround.com/alderaan/rebel-2_0.xsd">

	<classpath>
		<dir name="D:/WorkSpace/${project.directory}/${module.name}/war_file/target/${module.name}/WEB-INF/classes">
		</dir>
	</classpath>
	<web>
		<link target="/">
			<dir name="D:/WorkSpace/${project.directory}/${module.name}/war_file/src/main/webapp">
			</dir>
		</link>
	</web>
</application>

```

所以,在Weblogic部署的项目中,只要所的war文件夹中包含`rebel.xml`,且部署的时候使用了`jrebel.jar` 作为javaagent替换jvm类加载方式.那么他就会
根据`rebel.xml`中的路径进行监听,当路径中的 编译后的类文件/资源文件发生变化的时候,就会自动替换到weblogic已经部署的war文件夹对应的路径中去.

> 通过本文的配置,可以达到如下的效果:
> 1. 通过shell/cmd 脚本使用maven命令编译一次源代码.打包生成war文件夹
> 2. 通过idea自带的weblogic配置执行war文件夹到服务器的部署,之后通过 其`update class and resources`进行热部署

## Weblogic配置
首先要知道weblogic本身是怎样配置的.如果weblogic的server本身有一些启动的类路径,和启动参数,此时应该将其记下.

还需要知道的就是weblogic AdminServer的账号密码(废话),目标服务器的端口等基本配置

## idea 配置
idea的配置较为复杂,总体来说可以分成以下几个部分:
### artifact 与 module 配置

#### enable Jrebel
如果一个project下有多个module,请为需要进行热部署/生成rebel.xml的项目enable jrebel.
右键选中`module`->`jrebel`->`config module`勾上enable jrebel.

#### 修改 artifact与module 的output路径
1. 选中对应module打开其配置,在module一栏,修改其output path 为你`rebel.xml`中想要的classpath路径
2. 在artifact一栏,对选中的artifact,修改其output path也改成`rebel.xml`的classpath路径,需要注意的是,所选的artifact必须是war_explored类型.不然压缩成war的话不能热部署

### weblogic server配置
1. 新建一个server配置,选择`weblogic`->`local`.(应该先通过配置weblogic的安装目录,自动识别成一个application server)
2. 在Server一栏,
   `VM options`填写 上面`Weblogic Server的启动参数`
   `User`,`Password` 填写`weblogic AdminServer 的账号密码`
   `Domain path`填写weblogic server所属于的machine(机器)的路径.
   `Server to Launch`选择`managed` 下拉选择 子server
   `Admin host`填localhost
   `Admin post`默认是7001 可根据自己情况修改
3. 在Deployment一栏,<b>注意,这一步很重要</b>
   添加artifact,选择需刚刚修改过output path的artifact,
   把下面的before launch 的`make`,`build artifact`两步删掉.因为他们用的是java compiler而不是maven去构建项目,会导致build出来的代码不正确
4. 在Startup/Connection一栏
   可以看到有个run 或者 jrebel executor的配置.
   选中jrebel executor的配置.修改其`Pass environment variables`.
   添加一个键值对,名为CLASSPATH,值为 `weblogic 配置`中的`server类加载路径`


## maven plugin配置
由于通过maven构建代码的时候如果不指定`rebel.xml`的生成目录,则默认会加载到`target/classes`中.所以在maven构建的时候需要添加参数如下,
令整个构建程序的maven命令像这样:

```cmd
mvn clean install
-DskipTests=true
-Drebel.xml.dir=D:\WorkSpace\{project.directory}\{module.name}\war_file\target\{module.name}\WEB-INF\classes
-Drebel.generate.show=true jrebel:generate
```
其中跑jrebel:generate 需要maven的一个jrebel插件
通过在项目的最高级pom.xml中添加maven jrebel plugin
```xml
<plugin>
	<groupId>org.zeroturnaround</groupId>
	<artifactId>jrebel-maven-plugin</artifactId>
	<version>1.1.5</version>
	<executions>
		<execution>
			<id>generate-rebel-xml</id>
			<phase>process-resources</phase>
			<goals>
				<goal>generate</goal>
			</goals>
		</execution>
	</executions>
</plugin>
```


## 配置完成,尝试运行
至此,配置应该全部完成了.
重复刚才的结果,正常的编译一次,部署一次之后,就可以直接修改源文件看效果.

1. 通过shell/cmd 脚本使用maven命令编译一次源代码.打包生成war文件夹
> 这里倾向在项目目录中执行一条shell命令:(其中的{project.directory}等变量自己替换成现实的物理路径)
---
```cmd
 mvn clean install
 -DskipTests=true
 -Drebel.xml.dir=D:\WorkSpace\{project.directory}\{module.name}\war_file\target\{module.name}\WEB-INF\classes
 -Drebel.generate.show=true jrebel:generate
```

2. 通过idea自带的weblogic配置执行war文件夹到服务器的部署,之后通过 其`update class and resources`进行热部署

> 1. 启动Weblogic Admin Server,但是不要启动对应的子Server
> 2. 点击idea server右边的jrebel executor的小按钮.进行子Server的启动代码部署
> 3. Coding and hot swap
