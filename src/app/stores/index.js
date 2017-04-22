/* Created by Aquariuslt on 22/04/2017.*/
import Vue from 'vue';
import Vuex from 'vuex';

import coreStore from './core';
import blogStore from './blog';

Vue.use(Vuex);


let store = new Vuex.Store({

  modules: {
    core: coreStore,
    blog: blogStore
  }
});

export default store;
