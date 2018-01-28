import './styles.css';

import Vue from 'vue';
import VueMaterial from 'vue-material';

import router from './router';
import store from './store';
import i18n from './locale';

import './core';
import './post';

import App from './App.vue';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();

Vue.config.productionTip = false;
Vue.use(VueMaterial);

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<app/>',
  components: {App}
});

