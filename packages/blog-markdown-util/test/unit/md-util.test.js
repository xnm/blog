/* eslint-disable no-undef */

import mdUtil from './md-util';

describe('md-util', () => {
  it('# should load md-util without jest package itself', () => {
    expect(mdUtil.convert()).toEqual('hello md-util');
  });
});
