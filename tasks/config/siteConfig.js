/** Created by Aquariuslt on 6/28/16.*/
module.exports = {
  siteName: 'Aquariuslt Home',
  siteDescription:'Coder,WoWer',
  profileLinks:[
    {
      link:'Github',
      icon:'keyboard',
      description:'https://github.com/Aquariuslt'
    },
    {
      link:'Twitter',
      icon:'twitter',
      description:'https://twitter.com/superaquariuslt'
    }
  ],
  subSiteLinks: [
    {
      name: 'Blog',
      link: 'http://blog.aquariuslt.com',
      description: 'Tech Blog'
    },
    {
      name: 'Debug',
      link: 'http://debug.aquariuslt.com',
      description: 'Debug Log'
    },
    {
      name: 'Game',
      link: 'http://game.aquariuslt.com',
      description: 'WoW Daily'
    }
  ],

  friendLinks: [
    {
      name: 'wxsm blog',
      link: 'http://anubarak.com',
      description: 'Kary Gor博客,前端大神'
    },
    {
      name: 'lousama',
      link: 'http://lousama.com',
      description: '为女人拒绝阿里的楼总'
    },
    {
      name: 'NotFound404',
      link: 'https://github.com/404NoFound',
      description: '良哥的Github'
    },
    {
      name: '购物狂魔13c',
      link: 'http://corydon.cc',
      description:  'Android Big Deal in Beijing'
    }
  ],

  disqusShortName: 'althome',
  
  
  /* 
  * git deploy config,should in server site
  * */
  deployOptions:{
    remoteUrl:'https://github.com/Aquariuslt/aquariuslt.github.io.git',
    origin:'origin',
    branch:'master',
    cacheDir:'.cache'
  },
  cname:'blog.aquariuslt.com'
};