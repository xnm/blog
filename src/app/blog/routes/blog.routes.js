/* Created by Aquariuslt on 22/04/2017.*/

import Home from '../views/Home.vue';
import PostDetail from '../views/PostDetail.vue'

let blogRoutes = [
  {
    path: '/',
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
  },
  {
    path: '/post/:year/:month/:date/:filename',
    name: 'Post Detail',
    component: PostDetail
  }
];

export default blogRoutes;
