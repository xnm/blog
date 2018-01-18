/* import mocked vue, @vue/test-utils methods */
import localVue from '../../../shared/mocks/vue';
import {shallow} from '@vue/test-utils';

import NavMenu from '@/core/components/nav/NavMenu';

describe('NavMenu.vue', function() {

  it('# should mount NavMenu.vue correctly if not set any props', function() {
    shallow(NavMenu, {localVue});
  });

  describe('NavMenu.vue: direct internal link menu', function() {
    let $this = this;
    before('mounted component', function() {
      $this.wrapper = shallow(NavMenu, {localVue});
    });

    it('# should render directly link when menu.expandable is false', function() {
      $this.wrapper.setProps({
        menu: {
          expandable: false,
          link: '/tags',
          name: 'Tags'
        }
      });
      expect($this.wrapper.text()).to.include('Tags');
    });

    it('# should render a tag and href attributes when using non-internal link', function() {
      $this.wrapper.setProps({
        menu: {
          expandable: false,
          link: 'https://www.google.com',
          name: 'Google'
        }
      });
      expect($this.wrapper.text()).to.include('Google');
      expect($this.wrapper.contains('a')).to.be.true;

      const a = $this.wrapper.findAll('a').at(0);
      expect(a.is('a')).to.be.true;
      expect(a.attributes().href).not.to.be.undefined;
      expect(a.attributes().href).to.eq('https://www.google.com');
      expect(a.attributes().target).not.to.be.undefined;
      expect(a.attributes().target).to.eq('_blank');
    });

    it('# should render a tag and not blank link when using internal link', function() {
      $this.wrapper.setProps({
        menu: {
          expandable: false,
          link: '/tags',
          name: 'Tags'
        }
      });
      expect($this.wrapper.text()).to.include('Tags');
      expect($this.wrapper.contains('a')).to.be.false;

      const li = $this.wrapper.findAll('li').at(0);
      expect(li.is('li')).to.be.true;
      expect(li.attributes().to).not.to.be.undefined;
      expect(li.attributes().to).to.eq('/tags');
      expect(li.attributes().target).to.be.undefined;
    });
  });

  describe('NavMenu.vue: expandable link menu', function() {
    let $this = this;
    before('mounted component', function() {
      $this.wrapper = shallow(NavMenu, {localVue});
    });

    it('# should render expandable sub list when menu.expandable is true', function() {
      $this.wrapper.setProps({
        menu: {
          expandable: true,
          name: 'Categories',
          links: {}
        }
      });

      expect($this.wrapper.text()).to.include('Categories');
      const li = $this.wrapper.findAll('li').at(0);
      expect(li.is('li')).to.be.true;
      expect(li.attributes()['md-expand']).not.to.be.undefined;
    });

    it('# should render expandable sub list when links contains internal link', function() {
      $this.wrapper.setProps({
        menu: {
          expandable: true,
          name: 'Categories',
          links: {
            debug:{
              url:'/category/debug',
              name:'Debug'
            }
          }
        }
      });
      expect($this.wrapper.text()).to.include('Categories');
      const li = $this.wrapper.findAll('li').at(0);
      expect(li.is('li')).to.be.true;
      expect(li.attributes()['md-expand']).not.to.be.undefined;

      expect($this.wrapper.findAll('li').length === 2).to.be.true;
      const internalLink = $this.wrapper.findAll('li').at(1);
      expect(internalLink.is('li')).to.be.true;
      expect(internalLink.attributes().to).not.to.be.undefined;
      expect(internalLink.attributes().to).to.eq('/category/debug');
    });



    it('# should render expandable sub list when links contains internal link', function() {
      $this.wrapper.setProps({
        menu: {
          expandable: true,
          name: 'Friend Links',
          links: {
            wxsm:{
              url:'https://wxsm.space',
              name:'Kary Gor Blog'
            }
          }
        }
      });
      expect($this.wrapper.text()).to.include('Friend Links');
      expect($this.wrapper.text()).to.include('Kary Gor Blog');
      const li = $this.wrapper.findAll('li').at(0);
      expect(li.is('li')).to.be.true;
      expect(li.attributes()['md-expand']).not.to.be.undefined;

      expect($this.wrapper.findAll('li').length === 2).to.be.true;
      const internalLink = $this.wrapper.findAll('li').at(1);
      expect(internalLink.is('li')).to.be.true;
      expect(internalLink.attributes().to).to.be.undefined;
      expect(internalLink.attributes().href).not.to.be.undefined;
      expect(internalLink.attributes().href).to.eq('https://wxsm.space');
    });
  });
});
