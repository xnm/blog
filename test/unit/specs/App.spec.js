import Vue from 'vue';
import App from '@/app/App';

describe('App.vue', function() {

  it('# should mount App.vue correctly', function() {
    const Constructor = Vue.extend(App);
    const vm = new Constructor().$mount();

  });
});
