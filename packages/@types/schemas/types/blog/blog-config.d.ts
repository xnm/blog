declare namespace Config {
  export interface Site {
    host: string;
    title: string;
    subtitle?: string;
    description?: string;
    language?: string | 'en' | 'zh';
    copyright: string;
  }

  export interface Build extends Site {
    directory: {
      posts: string;
      public: string;
    };

    favicon?: string;
    theme: string;
  }

  export interface Bundle {
    site: Config.Site,
    build: Config.Build
  }


}

