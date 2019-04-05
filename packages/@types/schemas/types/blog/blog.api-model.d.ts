declare namespace BlogApiModel {

  interface Overview {
    name: string;
    total: number;
    link: string;
  }


  /**
   * @example
   * - /api/v1/posts
   */
  export type PostsOverview = BlogModel.Post[];

  /**
   * @example
   * - /api/v1/posts/:year
   */
  export interface ByYearPostsQuery {

  }

  /**
   * @example
   * - /api/v1/posts/:year/:month
   */
  export interface ByMonthPostsQuery {

  }


  /**
   * @example
   * - /api/v1/posts/:year/month/:date/:filename
   */
  export interface PostsPermalinkQuery {
    [path: string]: BlogModel.Post;
  }


  /**
   * @example
   * - /api/v1/categories
   */
  export type CategoriesOverview = BlogApiModel.Overview[];

  /**
   * @example
   * - /api/v1/categories/:category
   */
  export interface CategoriesQuery {
    [path: string]: BlogModel.Post[];
  }


  /**
   * @example
   * - /api/v1/tags
   */
  export type TagsOverview = BlogApiModel.Overview[];


  /**
   * @example
   * - /api/v1/tags/:tag
   */
  export interface TagsQuery {
    [path: string]: BlogModel.Post[];
  }
}
