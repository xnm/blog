import localVue from '../../../shared/mocks/localVue';
import {shallow} from '@vue/test-utils';

import Profile from '@/core/components/nav/Profile';

describe('Profile.vue', function() {

  it('# should mount Profile.vue correctly', function() {
    shallow(Profile, {localVue});
  });

});
