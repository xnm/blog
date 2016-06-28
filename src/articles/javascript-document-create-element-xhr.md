```metadata
{
  "title": "关于document.createElement的图片加载问题",
  "date": "2016-04-02 17:14:39",
  "tags":["JavaScript"]
}
```


## Background
最近在更新网站首页的时候,在实现文章摘要结果的时候,采用了不太正当的方法导致加载时间过长.

在获取文章Summary的时候,原本Summary的样式应该是这样子的
```xml
<entry>
<title>
<![CDATA[ Angular Material md-button 不全部大写 ]]>
</title>
<link href="http://debug.aquariuslt.com/2016/03/20/angular-material-md-button-using-lowercase/"/>
<id>
http://debug.aquariuslt.com/2016/03/20/angular-material-md-button-using-lowercase/
</id>
<published>2016-03-20T07:33:50.000Z</published>
<updated>2016-03-22T05:42:44.939Z</updated>
<content type="html">
</content>
<summary type="html">
<![CDATA[
<h2 id="BackGround"><a href="#BackGround" class="headerlink" title="BackGround"></a>BackGround</h2><p>刚刚接触<code>Angular-Material</code>,发现其<
]]>
</summary>
</entry>
```
在获取Summary的时候,由于summary的片段是不完整的html标签字符串,根本没有终止符,无法合理的转化成摘要文字.

于是我就直接将content里面的全文html字符串来截取摘要内容.
如何合理的截取到html字符串里面的innerText呢?
一开始就使用了`document.createElement()`方法:
通过将html字符串来创建一连串的dom element,然后用innerText来获取去除html标签之后的内容.
```js
function handleArticleSummary(articleSummary){
    var div = document.createElement("div");
    div.innerHTML = articleSummary.content._;
    articleSummary.content.text = div.innerText;
  }

```

但是这样就会导致 html 里面的 img 标签和以前涉及网络加载的标签,会在随着`createElement()`后的赋值方法,去获取实际上的img内容.
加载图片或者其他脚本.这样导致第一次加载的时候耗时过长.

## Solution
目前还没有正统的解决办法,我是使用正则表达式匹配img标签,将img标签过滤掉.
来达到不必加载的目的.

```js
/**
   * Get innerText from html body.
   * When using document.createElement(htmlString),
   * which htmlString contains image link, will load image from its src.
   * it will cause much network time,so replace the image link.
   * */
  function handleArticleSummary(articleSummary){
    var imageLinkRegex = /<img\s[^>]*?src\s*=\s*['"]([^'"]*?)['"][^>]*?>/ig;
    var originalHtmlString = articleSummary.content._;
    var convertedHtmlString = originalHtmlString.replace(imageLinkRegex,'');
    var div = document.createElement("div");
    div.innerHTML = convertedHtmlString;
    articleSummary.content.text = div.innerText;
  }
```