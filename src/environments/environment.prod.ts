//noinspection JSUnusedGlobalSymbols
export const environment = {
  production: true,

  datasource: {
    posts: './posts.json'
  },

  blog: {
    avatorUrl: 'assets/images/avator.png',
    siteName: 'Aquariuslt Home',
    author: 'Aquariuslt',
    description: 'Coder,WoWer',
    blogLinks: [
      {
        category: 'Social',
        links: [
          {
            url: 'https://github.com/aquariuslt',
            displayName: 'Github',
            description: 'Github'
          },
          {
            url: 'https://twitter.com/superaquariuslt',
            displayName: 'Twitter',
            description: 'Twitter'
          }
        ]
      },
      {
        category: 'Friend Links',
        links: [
          {
            displayName: 'wxsm blog',
            url: 'https://wxsm.space',
            description: 'Kary Gor博客,前端大神'
          },
          {
            displayName: 'lousama',
            url: 'http://lousama.com',
            description: ''
          },
          {
            displayName: 'NotFound404',
            url: 'https://github.com/404NoFound',
            description: '车底良哥'
          },
          {
            displayName: '13c',
            url: 'http://corydon.cc',
            description: 'Android Big Deal in Beijing'
          }
        ]
      }
    ]
  }
};
