import Posts from './containers/Posts';
import Categories from './containers/Categories';
import Tags from './containers/Tags';

const routes = [
  {
    path: '/',
    exact: true,
    component: Posts
  },
  {
    path: '/categories',
    exact: true,
    component: Categories
  },
  {
    path: '/categories/:category',
    component: Posts
  },
  {
    path: '/tags',
    exact: true,
    component: Tags
  },
  {
    path: '/tags/:tag',
    component: Posts
  }
];

export default routes;
