import * as types from '@/core/store/mutation-types';

import store from '@/core/store';

const {mutations} = store;

describe('core:mutations', function() {

  it('# should load app config as payload', function() {
    let state = {
      config: {}
    };
    let emptyConfig = {};
    mutations[types.LOAD_APP_CONFIG](state, emptyConfig);

    expect(state.config).to.eq(emptyConfig);
  });

  it('# should register nav menus by size', function() {
    let state = {
      menus: []
    };
    let needRegisterMenus = {
      expandable: true,
      icon: 'menu',
      links: {}
    };
    mutations[types.REGISTER_NAV_MENUS](state, needRegisterMenus);
    expect(state.menus.length).to.eq(1);
  });

  it('# should sort by priority after register menu', function() {
    let state = {
      menus: []
    };

    let needRegisterMenusA = {
      expandable: true,
      icon: 'menu',
      links: {},
      priority:2
    };

    let needRegisterMenusB = {
      expandable: true,
      icon: 'menu',
      links: {},
      priority:1
    };

    mutations[types.REGISTER_NAV_MENUS](state, needRegisterMenusA);
    mutations[types.REGISTER_NAV_MENUS](state, needRegisterMenusB);

    expect(state.menus.length).to.eq(2);
    expect(state.menus[0].priority).to.be.below(state.menus[1].priority);
  });
});
