/* Created by Aquariuslt on 4/11/17.*/
import Vue from 'vue';
import App from './app/App.vue';
import * as VueMaterial from 'vue-material';

Vue.config.productionTip = false;
Vue.use(VueMaterial);

new Vue({
  el: '#app',
  template: '<app/>',
  components: {App}
});
