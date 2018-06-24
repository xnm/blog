/* import mocked vue, @vue/test-utils methods */
import localVue from '../../../shared/mocks/localVue';
import {shallow} from '@vue/test-utils';
import _ from 'lodash';

/* import components import */
import Navigation from '@/core/components/nav/Navigation.vue';

describe('Navigation.vue', function() {

  it('# should mount Navigation.vue correctly', function() {
    shallow(Navigation, {localVue});
  });

  describe('Navigation.vue: sidenav', function() {
    let $this = this;
    const title = 'Title';
    const description = 'Sub Title';
    const author = 'Author';

    beforeAll(function() {
      $this.wrapper = shallow(Navigation, {localVue});
    });

    it('# should render ui from props', function() {
      $this.wrapper.setProps({
        title: title,
        description: description,
        author: author
      });
      expect(_.includes($this.wrapper.text(), title)).toBeTruthy();
    });

    it('# should not show sidenav when menuVisible is false', function() {
      $this.wrapper.setData({
        menuVisible: false
      });
      expect(_.includes($this.wrapper.text(), title)).toBeTruthy();
    });

    it('# should show sidenav when menuVisible is true', function() {
      $this.wrapper.setData({
        menuVisible: true
      });
      expect(_.includes($this.wrapper.text(), title)).toBeTruthy();
    });
  });
});
