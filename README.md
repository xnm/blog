# blog.aquariuslt.com

[![Build Status](https://travis-ci.org/aquariuslt/blog.svg?branch=VUE)](https://travis-ci.org/aquariuslt/blog)
[![Circle CI Status](https://circleci.com/gh/aquariuslt/blog.svg?branch=VUE&style=shield)](https://github.com/aquariuslt/blog)
[![Coverage Status](https://coveralls.io/repos/github/quariuslt/blog/badge.svg?branch=VUE)](https://coveralls.io/github/Aquariuslt/blog?branch=VUE)


Blog Application using Vue Version.
See:[Blog](https://blog.aquariuslt.com)


### Features
- Single Page Application
- Progressive Web Application
- Markdown Writing
- Support Code Highlight
- Disqus
- Configurable
- Sitemap auto generating

### Dependencies
- vue
- vuex
- vue-Router
- vue-Material
- axios
- marked
- highlight.js


### Usage
If you want to setup your own spa blog.
Please follow this way.


#### Clone & Install Dependencies
```bash
git clone https://github.com/Aquariuslt/Blog.git blog
cd blog
npm install
```

> P.S. for China Users, please export chromium download url before install npm dependencies.

> Win: SET PUPPETEER_DOWNLOAD_HOST=https://storage.googleapis.com.cnpmjs.org

> Unix: export PUPPETEER_DOWNLOAD_HOST=https://storage.googleapis.com.cnpmjs.org


#### Try Run 
```bash
npm run serve
```

Then see your web app in 
[http://127.0.0.1:5000](http://127.0.0.1:5000)

#### Remove un-use files
I post my posts data in markdown format under folder
`posts/`.

Please delete all from it.

#### Try writing
```
cd posts
touch my-new-blog-post.md
```

Then start editing it in markdown way.
Then add meta for blog application parsing and indexing.

Below is an example:
```markdown
``metadata
{
  "title":"Blog Structure Update",
  "created":"2017-03-12",
  "category":"Blog",
  "tags":["Blog","Angular"]
}
``

## Hello
Hello, this is my new blog.
```

P.S. about metadata
> It's a custom language using json schema.
> It wont be shown in rendered post detail.
> And has fields:
> - title: String, Required
> - created: Date, Required, format 'YYYY-MM-DD'
> - category: String, Optional
> - tags: Array, Optional



#### Update Customize Config 
To customize you SPA blog.
Please see the `application.yml` in source folder.

```yaml
# This is AEXO Application YML
# Update your config here
## Site
title: 'Aquariuslt blog'
description: 'TL; DR'
author: 'Aquariuslt'
avator: 'http://image.aquariuslt.com/social/avator.png'
theme: '#1976d2'

## Nav Menus
nav:
  categories:
    enable: true
  tags:
    enable: true
  about:
    enable: true

## Friend Links
links:
  wxsm:
    name: 'Kary Blog'
    url: 'https://wxsm.space'
    desc: 'Kary Gor Blog'
  lousama:
    name: 'Lousama Blog'
    url: 'http://lousama.com'
    desc: '九鼎五百万年终Java大内高手,C字楼Picado刚枪选手'
  notfound:
    name: 'NotFound404'
    url: 'https://github.com/404NoFound'
    desc: '车底良哥'
  koala:
    name: '考拉的生活碎片'
    url: 'http://ikoala.net/'
    desc: '蛤交女大律师, 未毕业进驻上海TOP5律所'
  supremebb:
    name: '新片场 13c'
    url: 'http://corydon.cc/'
    desc: '新片场未来的Android职业队长,不带耳机打cs,脑放听声辩位把把吃鸡'
  xpp:
    name: 'CN RPMan'
    url: 'http://chjydu.com/'
    desc: 'ACM前区域金牌,世界未来的希望,口头禅是我来自黑马,请将我定义为智障'
  maview:
    name: 'Frank Zhu'
    url: 'http://frankxfz.me'
    desc: 'NLP guy'

## Advance Features
features:
  disqus:
    enable: true
    short_name:
  manifest:
    enable: true
    name: 'Aquariuslt Blog'
    short_name: 'Blog'
    description: 'Aquariuslt Blog'
    developer:
      name: 'Aquariuslt'
      url: 'https://github.com/aquariuslt'


## Others
cname: 'blog.aquariuslt.com'

```


#### Release and Deploy
Run command:
```bash
npm run build
```

Then deploy your dist folder in github pages repository.
