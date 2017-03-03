/* Created by Aquariuslt on 2017-03-04. */


export class BlogConfig {
  private _avatorUrl: string = 'assets/images/avator.png';
  private _blogName: string = 'Aquariuslt Home';
  private _author: string = 'Aquariuslt';
  private _description: string = 'Coder,WoWer';

  private _socialLinks: Array<BlogLink> = [
    {
      url: 'https://github.com/aquariuslt',
      displayName: 'Github',
      description: 'Github',
      icon: 'github'
    },
    {
      url: 'https://twitter.com/superaquariuslt',
      displayName: 'Twitter',
      description: 'Twitter',
      icon: 'twitter'
    }
  ];

  private _friendLinks: Array<BlogLink> = [
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
      description:  'Android Big Deal in Beijing'
    }
  ];


  constructor() {
  }


  get avatorUrl(): string {
    return this._avatorUrl;
  }

  get blogName(): string {
    return this._blogName;
  }

  get author(): string {
    return this._author;
  }

  get description(): string {
    return this._description;
  }


  get socialLinks(): Array<BlogLink> {
    return this._socialLinks;
  }

  get friendLinks(): Array<BlogLink> {
    return this._friendLinks;
  }
}

class BlogLink {
  url: string;
  icon?: string;
  displayName: string;
  description: string;
}