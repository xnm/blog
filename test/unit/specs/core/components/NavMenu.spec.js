import Vue from '../../../shared/mocks/vue';
import {shallow} from 'vue-test-utils';

import NavMenu from '@/core/components/nav/NavMenu';

describe('Profile.vue', function() {

  it('# should mount NavMenu.vue correctly', function() {
    shallow(NavMenu, {Vue});
  });
});
