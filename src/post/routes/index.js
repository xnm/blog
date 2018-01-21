import PostListLayout from '../layouts/PostListLayout';
import PostLayout from '../layouts/PostLayout';

let postRoutes = [
  {
    path: '/',
    name: 'AllPostList',
    component: PostListLayout
  },
  {
    path: '/tags',
    name: 'TagList',
    component: PostListLayout
  },
  {
    path: '/category/:category',
    name: 'FilterByCategoryPostList',
    component: PostListLayout,
    meta: {
      filter: {
        type: 'category'
      }
    }
  },
  {
    path: '/tag/:tag',
    name: 'FilterByTagPostList',
    component: PostListLayout,
    meta: {
      filter: {
        type: 'tag'
      }
    }
  },
  {
    path: '/post/:year/:month/:date/:filename',
    name: 'PostDetail',
    component: PostLayout
  }
];

export default postRoutes;
