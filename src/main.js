/* Created by Aquariuslt on 4/11/17.*/
import Vue from 'vue';
import VueMaterial from 'vue-material';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import App from './app/App.vue';

import {coreRoutes} from './app/core';
import {blogRoutes} from './app/blog';

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.use(Vuex);


let router = new VueRouter();

router.addRoutes(coreRoutes);
router.addRoutes(blogRoutes);

new Vue({
  el: '#app',
  router,
  template: '<app/>',
  components: {App}
});
