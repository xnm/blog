import PinterestLayout from '../layouts/PinterestLayout';

let postRoutes = [
  {
    path: '/',
    name: 'AllPostList',
    component: PinterestLayout
  },
  {
    path: '/tags',
    name: 'TagList',
    component: PinterestLayout
  },
  {
    path: '/category/:category',
    name: 'FilterByCategoryPostList',
    component: PinterestLayout,
    meta: {
      filter: ':category'
    }
  },
  {
    path: '/tag/:tag',
    name: 'FilterByTagPostList',
    component: PinterestLayout,
    meta: {
      filter: ':tag'
    }
  }
];

export default postRoutes;
