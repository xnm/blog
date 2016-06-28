```metadata
{
  "title": "Angular Material md-button 不全部大写",
  "date": "2016-03-20 15:33:50",
  "tags":["JavaScript","CSS","AngularJS"]
}
```

## BackGround
刚刚接触`Angular-Material`,发现其`md-button`指令是内文本全大写

## Solution
在CSS里面添加
```css
/** For md-button lowercase using lowercase */
.md-button {
  text-transform: capitalize !important;
}
```
![After Update CSS](https://img.alicdn.com/tfscom/TB1j2w_LVXXXXXWXpXXXXXXXXXX.png)
