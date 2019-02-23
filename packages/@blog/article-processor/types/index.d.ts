import Article from '@blog/schemas/src/core/Article';

declare namespace ArticleProcessor {
  export interface ProcessOptions {
    toc?: boolean;

  }

  export interface ProcessContext {
    md?: string;                      // markdown source
    html?: string;                    // escaped html
    toc?: TableOfContent;
  }
}


export interface BlogPosting extends Article {
  articleBody?: string;

}

type TableOfContent = Array<ContentItem>;

interface ContentItem {
  level: number;
  position: number;
  id: string;
  children?: Array<ContentItem>;
}


