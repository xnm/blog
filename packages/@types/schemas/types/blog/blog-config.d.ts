declare namespace Config {
  export interface App {
    host: string;

    title: string;
    id: string;
    description?: string;
    link?: string;
    language?: string | 'en' | 'zh';
    image?: string;
    favicon?: string;
    copyright: string;

  }

  export interface Build {

  }
}
