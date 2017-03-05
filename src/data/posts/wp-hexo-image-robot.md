```metadata
{
  "title": "Word Press迁移Hexo附加工具",
  "date": "2015-05-31 10:33:51",
  "tags": ["Blog","Hexo","Node.js"]
}
```



# WP-HEXO-ImageRobot

一个帮助从WordPress转移到Hexo博客过程中，下载原WordPress的图片到本地然后替换到Hexo的markdown文件中的链接的工具。

## Background

之前的WordPress博客文章迁移到Hexo博客的过程中，大概的步骤是这样的
1. 从WordPress仪表盘中导出所有文章与图片到xml文件中
2. 使用 ![][([https://github.com/hexojs/hexo-migrator-wordpress](https://github.com/hexojs/hexo-migrator-wordpress))] 的迁移工具生成source基本文件

但是缺点就是 文章中 img的src地址往往还是不变的。 这对于使用WordPress主机，且把图片放在WordPress主机上的博客迁移非常不友好。 因为一旦你将Hexo博客绑定到你的域名的时候，原来原来的图片链接将会失效。 这个工具帮你自动把生成的source中_post文件夹下的所有md文件中的图片链接下载下来，并且替换到md文件中。 重新生成Hexo博客之后，所有的图片都指向了本地文件，迁移得更完美

## Usage

编译之后 传入一个参数
```
/Users/Aquariuslt/Code/HEXO/source/`
```
即可