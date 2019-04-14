declare namespace Config {
  export interface Site {
    host: string;
    title: string;
    subtitle?: string;
    description?: string;
    language?: string | 'en' | 'zh';
    copyright: string;

    author?: string;
    bio?: string;
  }

  /**
   * 3rd party config
   */
  export interface Features {
    ga?: string;
    disqus?: string;
  }

  export interface Build {
    directory: {
      posts: string;
      public: string;
    };

    favicon?: string;
    theme: string;
  }

  export interface Bundle {
    site: Config.Site,
    build: Config.Build,
    features: Config.Features
  }


}

