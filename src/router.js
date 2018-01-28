import Vue from 'vue';
import VueRouter from 'vue-router';
import locale from '@/locale';

Vue.use(VueRouter);

let router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      };
    }
    if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 0};
    }
  }
});

router.beforeEach(function(toRoute, fromRoute, next) {
  document.title = locale.t('app.name').toString();
  next();
});

export default router;
