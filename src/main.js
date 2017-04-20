/* Created by Aquariuslt on 4/11/17.*/
import Vue from 'vue';
import VueMaterial from 'vue-material';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './app/App.vue';


Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.use(Vuex);


new Vue({
  el: '#app',
  template: '<app/>',
  components: {App}
});
