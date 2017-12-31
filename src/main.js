import './styles.css';

import Vue from 'vue';
import VueMaterial from 'vue-material';

import router from './router';
import store from './store';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(VueMaterial);

new Vue({
  el: '#app',
  router,
  store,
  template: '<app/>',
  components: {App}
});
