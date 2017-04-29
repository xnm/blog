/* Created by Aquariuslt on 4/24/17.*/
import Vue from 'vue';
import Vuex from 'vuex';

import createLogger from 'vuex/dist/logger';
Vue.use(Vuex);

let store = new Vuex.Store({
  modules: {},
  plugins: [
    createLogger()
  ]
});


export default store;
