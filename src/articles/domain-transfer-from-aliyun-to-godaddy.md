```metadata
{
  "title": "域名运营商转移：从万网转出到Godaddy",
  "date": "2015-07-10 12:58:40",
  "tags": ["Domain","VPS"]
}
```

## Background
前几天收到万网的通知，之前没注意看霸王条款，把阿里云主机迁移到DO了。

![aliyun-notification]()
卧槽就因为我在你家买了域名不用你家VPS就要浪费我辛辛苦苦备案了一个月的网站吗？一怒之下决定转移运营商。


域名转移运营商(万网到Godaddy)，从总体的角度来说要如下几点

### 从原运营商那里拿到 原来的域名锁密钥
这一步就非常只麻烦，需要分成以下几小步
1. 登陆万网[http://wanwang.aliyun.com/](http://wanwang.aliyun.com/)，(登了才发现 万网改成aliyun域名了)解除域名保护的锁。
点击域名进入管理页面
[![Domain Management]()]
2. 关闭各种安全验证
这一步很重要，因为如果不关闭安全认证，通过Whois 查看你的域名，则你的域名的所有者将会显示成  万网的 YinSiBaoHu@aliyun.com 神马的，这将会导致你的真正邮箱收不到 需转入的域名运营商(Godaddy)发来的请求邮件。
[![Close Authorization]()]()

3. 验证手机，接收短信。然后核对邮箱，获取转移码
这里按照提示操作，由于我操作过了 没有对应的截图。

当邮箱收到了转移码之后，开始进行第二大步。

### 注册需要转入的域名运营商
P.S.我选的是Godaddy

1. 添加域名转移请求，付费。
在Godaddy主页 选择“All Products”-“Transfer Domains”
[![Transfer Domain]()
在搜索需要转入的域名页面，输入要申请转入的域名 搜索。然后会上方会出现一个 列表，选中要转移的域名，点击checkout。

之后就是用支付宝支付，大概50RMB。这里不管要转入的域名所有权是不是你的，都必须先付费。


2. 开始发送转移域名请求
在“Domain”-“Pending Transfers in” 中可以看到要转移的域名列表。
由于我这里已经进行了转移，所以作文字说明。
[![Start Transfer]()



首先，要确认你要转入的域名，Admin Email那一栏是不是 你的邮箱。
如果之前在万网那边没有取消隐私保护，那么这里的AdminEmail就会变成 aliyun的保护邮箱。
![Cancel Private Protect]()
确认邮箱是自己的域名邮箱之后，中间的Status一栏，是发送域名转移的第一步请求。

点击第一步之后，你的域名邮箱应该会受到一封邮件
[![Verify ID]()
里面带有一个 TransferID和Code 用来帮Godaddy确认你是邮箱主人。

然后输入ID和Code之后，就可以用第一步万网给你发来的转移密码，进行转移。

最后转移到万网可以看到
[![Wait for operation]()]()
等几天就成功了。
记得重置 域名的dns和ip。

