/* Created by Aquariuslt on 4/11/17.*/
import Vue from 'vue';
import VueMaterial from 'vue-material';

import {router} from './app/routes';
import store from './app/stores';
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
