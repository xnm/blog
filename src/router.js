import Vue from 'vue';
import VueRouter from 'vue-router';
import locale from '@/locale';

Vue.use(VueRouter);

let router = new VueRouter({
  mode: 'history'
});

router.beforeEach(function(toRoute, fromRoute, next) {
  document.title = locale.t('app.name').toString();
  next();
});

export default router;
