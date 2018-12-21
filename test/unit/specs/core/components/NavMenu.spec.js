/* import mocked vue, @vue/test-utils methods */
import localVue from '../../../shared/mocks/localVue';
import { shallowMount } from '@vue/test-utils';

import NavMenu from '@/core/components/nav/NavMenu.vue';
import _ from 'lodash';

describe('NavMenu.vue', function() {

  it('# should mount NavMenu.vue correctly if not set any props', function() {
    shallowMount(NavMenu, { localVue });
  });

  describe('NavMenu.vue: direct internal link menu', function() {
    let $this = this;
    beforeEach(function() {
      $this.wrapper = shallowMount(NavMenu, { localVue });
    });

    it('# should render directly link when menu.expandable is false', function() {
      $this.wrapper.setProps({
        menu: {
          expandable: false,
          link: '/tags',
          name: 'Tags'
        }
      });
      expect(_.includes($this.wrapper.text(), 'Tags')).toBeTruthy();
    });

    it('# should render a tag and href attributes when using non-internal link', function() {
      $this.wrapper.setProps({
        menu: {
          expandable: false,
          link: 'https://www.google.com',
          name: 'Google'
        }
      });
      expect($this.wrapper.text()).toEqual('Google');
      expect($this.wrapper.contains('md-list-item-stub')).toBeTruthy();

      const a = $this.wrapper.findAll('md-list-item-stub').at(0);
      expect(a.is('md-list-item-stub')).toBeTruthy();
      expect(a.attributes().href).toBeDefined();
      expect(a.attributes().href).toEqual('https://www.google.com');
      expect(a.attributes().target).toBeDefined();
      expect(a.attributes().target).toEqual('_blank');
    });

    it('# should render a tag and not blank link when using internal link', function() {
      $this.wrapper.setProps({
        menu: {
          expandable: false,
          link: '/tags',
          name: 'Tags'
        }
      });
      expect($this.wrapper.text()).toEqual('Tags');
      expect($this.wrapper.contains('a')).toBeFalsy();

      const li = $this.wrapper.findAll('md-list-item-stub').at(0);
      expect(li.is('md-list-item-stub')).toBeTruthy();
      expect(li.attributes().to).toBeDefined();
      expect(li.attributes().to).toEqual('/tags');
      expect(li.attributes().target).toBeUndefined();
    });
  });

  describe('NavMenu.vue: expandable link menu', function() {
    let $this = this;
    beforeEach(function() {
      $this.wrapper = shallowMount(NavMenu, { localVue });
    });

    it('# should render expandable sub list when menu.expandable is true', function() {
      $this.wrapper.setProps({
        menu: {
          expandable: true,
          name: 'Categories',
          links: {}
        }
      });
      expect(_.includes($this.wrapper.text(), 'Categories')).toBeTruthy();
      const li = $this.wrapper.findAll('md-list-item-stub').at(0);
      expect(li.is('md-list-item-stub')).toBeTruthy();
      expect(li.attributes()['md-expand']).toBeDefined();
    });

    it('# should render expandable sub list when links contains internal link', function() {
      $this.wrapper.setProps({
        menu: {
          expandable: true,
          name: 'Categories',
          links: {
            debug: {
              url: '/category/debug',
              name: 'Debug'
            }
          }
        }
      });
      expect(_.includes($this.wrapper.text(), 'Categories')).toBeTruthy();
      const li = $this.wrapper.findAll('md-list-item-stub').at(0);
      expect(li.is('md-list-item-stub')).toBeTruthy();
      expect(li.attributes()['md-expand']).toBeDefined();

      expect($this.wrapper.findAll('md-list-item-stub').length === 2).toBeTruthy();
      const internalLink = $this.wrapper.findAll('md-list-item-stub').at(1);
      expect(internalLink.is('md-list-item-stub')).toBeTruthy();
      expect(internalLink.attributes().to).toBeDefined();
      expect(internalLink.attributes().to).toEqual('/category/debug');
    });

    it('# should render expandable sub list when links contains internal link', function() {
      $this.wrapper.setProps({
        menu: {
          expandable: true,
          name: 'Friend Links',
          links: {
            wxsm: {
              url: 'https://wxsm.space',
              name: 'Kary Gor Blog'
            }
          }
        }
      });
      expect(_.includes($this.wrapper.text(), 'Friend Links')).toBeTruthy();
      expect(_.includes($this.wrapper.text(), 'Kary Gor Blog')).toBeTruthy();
      const li = $this.wrapper.findAll('md-list-item-stub').at(0);
      expect(li.is('md-list-item-stub')).toBeTruthy();
      expect(li.attributes()['md-expand']).toBeDefined();

      expect($this.wrapper.findAll('md-list-item-stub').length === 2).toBeTruthy();
      const internalLink = $this.wrapper.findAll('md-list-item-stub').at(1);
      expect(internalLink.is('md-list-item-stub')).toBeTruthy();
      expect(internalLink.attributes().to).toBeUndefined();
      expect(internalLink.attributes().href).toBeDefined();
      expect(internalLink.attributes().href).toEqual('https://wxsm.space');
    });
  });
});
