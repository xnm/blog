declare namespace BlogApiModel {

  interface ApiQuery {
    [path: string]: string | object | object[];
  }

  interface Overview {
    name: string;
    total: number;
    link: string;
  }

  /**
   * @example
   * - /api/v1/posts
   * - /api/v1/posts/:year
   * - /api/v1/posts/:year/:month
   */
  export type PostsOverview = BlogModel.Post[];

  export interface PostsOverviewQuery extends ApiQuery {
    [path: string]: PostsOverview;
  }

  /**
   * @example
   * - /api/v1/posts/:year/month/:date/:filename
   */
  export interface PostsPermalinkQuery extends ApiQuery {
    [path: string]: BlogModel.Post;
  }

  /**
   * @example
   * - /api/v1/categories
   */
  export type CategoriesOverview = BlogApiModel.Overview[];

  export interface CategoriesOverviewQuery extends ApiQuery {
    [path: string]: CategoriesOverview;
  }

  /**
   * @example
   * - /api/v1/categories/:category
   */
  export interface CategoriesQuery extends ApiQuery {
    [path: string]: BlogModel.Post[];
  }

  /**
   * @example
   * - /api/v1/tags
   */
  export type TagsOverview = BlogApiModel.Overview[];

  export interface TagsOverviewQuery extends ApiQuery {
    [path: string]: TagsOverview;
  }

  /**
   * @example
   * - /api/v1/tags/:tag
   */
  export interface TagsQuery extends ApiQuery {
    [path: string]: BlogModel.Post[];
  }
}
