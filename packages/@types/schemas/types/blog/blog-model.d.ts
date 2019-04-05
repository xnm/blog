/**
 * definition of origin data types from markdown-it & markdown-it plugins
 */
declare namespace BlogModel {
  export interface PostFile {
    filename: string;
    md: string;
  }

  export interface Post extends PostFile {
    filename: string;
    md: string;
    html: string;
    permalink?: string;
    metadata: Metadata;
    toc?: ContentItem[];
    images?: string[];
    summary?: string;
  }

  export interface Metadata {
    title: string;
    created: string;
    updated: string;
    category: string;
    tags?: string[];
    cover?: string;
  }

  export interface ContentItem {
    id: string;
    position?: number;
    level: number;
    pid?: number;
    children: ContentItem[];
  }

}
