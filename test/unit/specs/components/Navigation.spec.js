/* import mocked vue, vue-test-utils methods */
import Vue from '../../shared/mocks/vue';
import {shallow} from 'vue-test-utils';

/* import components import */
import Navigation from '@/components/nav/Navigation';

describe('Navigation.vue', function() {

  it('# should mount Navigation.vue correctly', function() {
    shallow(Navigation, {Vue});
  });

  describe('Navigation.vue: sidenav', function() {
    let $this = this;

    before('mounted component', function() {
      $this.wrapper = shallow(Navigation, {Vue});
    });

    it('# should not show sidenav when menuVisible is false', function() {
      $this.wrapper.setData({
        menuVisible: false
      });
    });

    it('# should show sidenav when menuVisible is true', function() {
      $this.wrapper.setData({
        menuVisible: true
      });
    });
  });
});
