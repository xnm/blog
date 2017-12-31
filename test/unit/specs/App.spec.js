/* import mocked vue, vue-test-utils methods */
import Vue from '../shared/mocks/vue';
import {shallow} from 'vue-test-utils';

/* import components import */
import App from '@/app/App';

/* import other utils */

describe('App.vue', function() {

  it('# should mount App.vue correctly', function() {
    shallow(App, {
      Vue
    });
  });
});
