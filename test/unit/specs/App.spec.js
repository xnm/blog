/* import mocked vue, @vue/test-utils methods */
import localVue from '../shared/mocks/localVue';
import Vuex from 'vuex';
import {shallow} from '@vue/test-utils';
/* import components import */
import App from '@/App';
/* import other utils*/

describe('App.vue', function() {

  let $this = this;

  beforeEach('# mock app config getters', function() {
    let getters = {
      title: () => 'Blog Title',
      description: () => 'Blog Description',
      author: () => 'Author',
      avator: () => 'https://img.aquariuslt.com/social/avator.png',
      menus: () => []
    };

    $this.store = new Vuex.Store({
      getters
    });
  });

  it('# should mount App.vue correctly', function() {
    shallow(App, {
      store: $this.store,
      localVue,
      stubs: [
        'router-link',
        'router-view'
      ]
    });
  });

  it('# should render props correctly', function() {
    const wrapper = shallow(App, {
      store: $this.store,
      localVue,
      stubs: [
        'router-link',
        'router-view'
      ]
    });

    expect(wrapper.contains('div')).to.be.true;
  });
});
