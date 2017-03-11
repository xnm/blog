// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,

  // Development environment data source url settings
  datasource: {
    posts: './build/posts.json',
    tags: './build/tags.json',
    categories: './build/categories.json'
  },

  // Update your blog settings here
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
    ],

    // Enable posts data menus in sidenav
    tags: {
      sidenav: true,
      // filter the data from home post list, only show the non-hidden at home page
      // but can will be seem detail when click into tags list
      filter: true,
      hidden: [],
    },
    categories: {
      sidenav: true,
      filter: true,
      hidden: []
    },

    about: {},


    disqus: {
      enable: true,
      shortName: 'aquariuslt'
    }
  },
  https: {
    enable: false,
    force: false
  }
};
