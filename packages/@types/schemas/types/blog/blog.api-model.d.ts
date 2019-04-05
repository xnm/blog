declare namespace BlogApiModel {
  export interface Posts {
    [path: string]: BlogModel.Post;
  }

  export interface Categories {
    [path: string]: BlogModel.Post[];
  }

  export interface Tags{
    [path: string]: BlogModel.Post[];
  }
}
