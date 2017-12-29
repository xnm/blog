# blog.aquariuslt.com

[![Build Status](https://api.travis-ci.org/Aquariuslt/blog.svg?branch=VUE)](https://github.com/Aquariuslt/Blog)
[![Coverage Status](https://coveralls.io/repos/github/Aquariuslt/blog/badge.svg?branch=VUE)](https://coveralls.io/github/Aquariuslt/blog?branch=VUE)


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
`src/resources/posts/`.

Please delete all from it.

#### Try writing
```
cd src/resources/posts
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

# Blog Variables
blog:
  name: 'Aquariuslt Blog'
  # Avator Relative URL, example: assets/images/avator.png
  avator: '/assets/imgs/avator.png'
  author: 'Aquariuslt'
  description: 'Coder,WoWer'
  externalLinks:
    -
      label: 'Social'
      prority: 2
      links:
        -
          url: 'https://github.com/aquariuslt'
          displayName: 'Github'
          description: 'Github'
        -
          url: 'https://twitter.com/superaquariuslt'
          displayName: 'Twitter'
          description: 'Twitter'
        -
          url: 'https://aquariuslt.com'
          displayName: 'Posts Archive'
          description: 'Past Version Blog'

    -
      label: 'Friend Links'
      prority: 1
      links:
        -
          displayName: 'wxsm blog'
          url: 'https://wxsm.space'
          description: 'Kary Gor博客,前端大神'
        -
          displayName: 'lousama'
          url: 'http://lousama.com'
          description: '九鼎五百万年终Java大内高手'
        -
          displayName: 'NotFound404'
          url: 'https://github.com/404NoFound'
          description: '车底良哥'



  # Hidden Category Lists
  categories:
    filter: true
    hidden:
      - 'Else'

  tags:
    filter: true
    hidden:
      - 'Diary'

  # Enable About Page
  about:
    enable: true


  # Disqus Config
  disqus:
    enable: true
    shortName: 'aquariuslt'

  # Progressive Web App
  pwa:
    enable: true
    name: 'Aquariuslt Blog'
    shortName: 'Blog'
    description: 'Aquariuslt Blog'
    icon: 'favicon.png'
    developer:
      name: 'Aquariuslt'
      url: 'https://github.com/aquariuslt'

# Blog Deploy Options
# Domain
cname: 'blog.aquariuslt.com'
```


#### Release and Deploy
Run command:
```bash
npm run build
```

Then deploy your dist foler in github pages repository.
