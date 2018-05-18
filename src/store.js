import Vue from 'vue';
import Vuex from 'vuex';

import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

let store = new Vuex.Store({
  modules: {},
  plugins: process.env.NODE_ENV === 'development' ? [createLogger({})] : []
});

export default store;
