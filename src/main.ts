import './style.less';

import Vue from 'vue';
import VueMaterial from 'vue-material';

import router from './router';
import store from './store';

import './core';
import './offline';
import './locale';

import App from './App.vue';


Vue.config.productionTip = false;
Vue.use(VueMaterial);

const app = new Vue({
  el: '#app',
  store,
  router,
  template: '<app/>',
  components: {App}
});
