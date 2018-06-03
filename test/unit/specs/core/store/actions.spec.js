import moxios from 'moxios';
import Vue from 'vue';
import Vuex from 'vuex';
import sinon from 'sinon';
import * as types from '@/core/store/mutation-types';
import store from '@/core/store';

import mockedApplicationConfigResponse from '../../../shared/fixtures/core/application.json';

Vue.use(Vuex);
const {actions} = store;

describe('core:actions', function() {

  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it('# mock application.json response for actions', function(done) {
    const mockMutations = {
      [types.LOAD_APP_CONFIG](state, payload) {
      },
      [types.REGISTER_NAV_MENUS](state, payload) {
      }
    };

    sinon.spy(mockMutations, types.LOAD_APP_CONFIG);
    sinon.spy(mockMutations, types.REGISTER_NAV_MENUS);

    const testStore = new Vuex.Store({
      actions,
      mutations: mockMutations
    });
    testStore.dispatch(types.LOAD_APP_CONFIG);

    moxios.wait(function() {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockedApplicationConfigResponse
      }).then(function() {
        expect(mockMutations[types.LOAD_APP_CONFIG].called).to.be.true;
        expect(mockMutations[types.REGISTER_NAV_MENUS].called).to.be.true;
        done();
      });
    });
  });
});
