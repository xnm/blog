import Article from '@blog/schemas/src/core/Article';

declare namespace ArticleProcessor {
  export interface ProcessOptinos {
    toc?: boolean;
  }
}


export interface BlogArticle extends Article {

}
