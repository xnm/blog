/* Created by Aquariuslt on 22/04/2017.*/

import Home from '../../views/blog/Home.vue';


let blogRoutes = [
  {
    path: '/',
    name: 'Default',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      showInNavMenu: true,
      icon: 'home'
    }
  },
  {
    path: '/post-list',
    name: 'Post List',
    component: Home,
    meta: {
      showInNavMenu: true,
      icon: 'home'
    }
  }
];

export default blogRoutes;
