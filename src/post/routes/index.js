import PostListLayout from '../layouts/PostListLayout';

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
  }
];

export default postRoutes;
