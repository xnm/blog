import postApi from '@/api/post-api';

import { action, computed, observable, runInAction } from 'mobx';

export class PostStore {
  @observable $posts: BlogApiModel.PostsOverview = [];

  @computed get posts(): BlogApiModel.PostsOverview {
    return this.$posts;
  }

  @action loadPosts(): void {
    postApi.loadAllPosts().then(
      (apiResult): void => {
        runInAction(
          (): void => {
            this.$posts = apiResult.data;
          }
        );
      }
    );
  }
}

export default new PostStore();
