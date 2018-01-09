/* import mocked vue, vue-test-utils methods */
import Vue from '../../../shared/mocks/vue';
import {shallow} from 'vue-test-utils';

/* import components import */
import Navigation from '@/core/components/nav/Navigation';

describe('Navigation.vue', function() {

  it('# should mount Navigation.vue correctly', function() {
    shallow(Navigation, {Vue});
  });

  describe('Navigation.vue: sidenav', function() {
    let $this = this;
    const title = 'Title';
    const description = 'Sub Title';
    const author = 'Author';

    before('mounted component', function() {
      $this.wrapper = shallow(Navigation, {Vue});
    });

    it('# should render ui from props', function() {

      $this.wrapper.setProps({
        title: title,
        description: description,
        author: author
      });
      expect($this.wrapper.text()).to.include(title);
    });

    it('# should not show sidenav when menuVisible is false', function() {
      $this.wrapper.setData({
        menuVisible: false
      });
      expect($this.wrapper.text()).to.include(title);
    });

    it('# should show sidenav when menuVisible is true', function() {
      $this.wrapper.setData({
        menuVisible: true
      });
      expect($this.wrapper.text()).to.include(title);
    });
  });
});
