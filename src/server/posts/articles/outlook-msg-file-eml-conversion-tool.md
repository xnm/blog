```metadata
{
  "title": "轮子:Microsoft Outlook .msg 文件解析转换 .eml 文件",
  "date": "2015-12-27 15:57:07",
  "tags": ["Node.js","Java"]
}
```



## Background

因为项目中遇到了一个比较正常的需求,就是用户可能会上传一份由软狗导出的.msg文件,
然后读出里面的内容,在解析成.eml(通用的email message)格式.

Google许久,发现Node.js并没有现成的lib能够解析.msg文件.
想起了之前使用Java和VBS是有现成的类库的,所以打算用一个比较危险的方式,即
使用node创建一个shell子进程,然后执行java命令,调用jar去解析文件.

## Link
[Github](https://github.com/Aquariuslt/MsgFileConversionTool)

## Usage


1. 构建jar
```sh
$mvn clean package
```

2. 转换文件
参考 `example.js`
可以传三个参数进去`source`,`target`,`messageId`
> `source` 是源.msg文件路径(确保存在)
> `target` 是目标生生成的文件路径
> `messageId` 可选参数,将自定义的messageId赋予给所生成的 eml 文件的 messageId