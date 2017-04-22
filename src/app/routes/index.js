import Vue from 'vue';
import VueRouter from 'vue-router';

import blogRoutes from './blog/blog.routes';
import coreRoutes from './core/core.routes';

Vue.use(VueRouter);


let router = new VueRouter({});

router.addRoutes(blogRoutes);
router.addRoutes(coreRoutes);

let routes = [];

routes = routes
  .concat(blogRoutes)
  .concat(coreRoutes);

export {
  router,
  routes
};
