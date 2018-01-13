import Vue from '../../../shared/mocks/vue';
import {shallow} from 'vue-test-utils';

import Profile from '@/core/components/nav/Profile';

describe('Profile.vue', function() {

  it('# should mount Profile.vue correctly', function() {
    shallow(Profile, {Vue});
  });

});
