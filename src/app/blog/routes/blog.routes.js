/* Created by Aquariuslt on 22/04/2017.*/

import Home from '../views/Home.vue';
import PostDetail from '../views/PostDetail.vue';
import Posts from '../views/Posts.vue';

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
    path: '/post/:year/:month/:date/:filename',
    name: 'Post Detail',
    component: PostDetail
  },
  {
    path: '/category/:filterValue',
    name: 'By CategoryName',
    component: Posts,
    meta: {
      title: 'Category:filterValue'
    }
  },
  {
    path: '/tag/:filterValue',
    name: 'By TagName',
    component: Posts,
    meta: {
      title: 'Tag:filterValue'
    }
  }
];


export default blogRoutes;
