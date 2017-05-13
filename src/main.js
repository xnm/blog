/* Created by Aquariuslt on 4/11/17.*/
import 'es6-promise/auto';
import Vue from 'vue';
import VueMaterial from 'vue-material';


import router from './router';
import store from './store';

import './app/core';
import './app/blog';


import App from './app/App.vue';


Vue.config.productionTip = false;
Vue.use(VueMaterial);


new Vue({
  el: '#app',
  router,
  store,
  template: '<app/>',
  components: {App}
});

Vue.material.registerTheme('aexo', {
  accent: {
    color: 'blue',
    hue: 300
  }
});
Vue.material.setCurrentTheme('aexo');
