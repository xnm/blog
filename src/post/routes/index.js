import PostListLayout from '../layouts/PostListLayout';
import PostListTableLayout from '../layouts/PostListTableLayout';
import PostLayout from '../layouts/PostLayout';
import PostTagsLayout from '../layouts/PostTagsLayout';

let postRoutes = [
  {
    path: '/',
    name: 'AllPostList',
    component: PostListLayout
  },
  {
    path: '/posts/:year/:month/:date/:filename',
    name: 'PostDetail',
    component: PostLayout
  },
  {
    path: '/tags',
    name: 'TagList',
    component: PostTagsLayout
  },
  {
    path: '/categories/:category',
    name: 'FilterByCategoryPostList',
    component: PostListTableLayout,
    meta: {
      filter: {
        key: 'category',
        type: 'category'
      }
    }
  },
  {
    path: '/tags/:tag',
    name: 'FilterByTagPostList',
    component: PostListTableLayout,
    meta: {
      filter: {
        key: 'tag',
        type: 'tags'
      }
    }
  }
];

export default postRoutes;
