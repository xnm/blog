/**
 * definition of origin data types from markdown-it & markdown-it plugins
 * */
declare namespace BlogModel {
  export interface Post {
    md: String;
    html: String;
    metadata: Metadata;
    toc?: Array<ContentItem>;
    images?: Array<String>;
    description?: String;
  }

  export interface Metadata {
    title: String;
    created: String;
    updated: String;
    category: String;
    tags?: Array<String>;
    cover?: String;
  }

  export interface ContentItem {
    id: string;
    position?: number;
    level: number;
    pid?: number;
    children?: Array<ContentItem>;
  }

}
