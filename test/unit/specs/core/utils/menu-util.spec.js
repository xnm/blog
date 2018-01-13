import menuUtil from '@/core/utils/menu-util';

describe('menu-util', function() {

  describe('menu-util:convertExpandableMenu', function() {
    it('# should icon to be link and priority to be 20 when pass empty object as option', function() {
      let menu = menuUtil.convertExpandableMenu('Categories', {}, {});
      expect(menu.expandable).to.be.true;
      expect(menu.priority).to.eq(20);
      expect(menu.icon).to.eq('link');
    });

    it('# should icon can be change when pass', function() {
      let menu = menuUtil.convertExpandableMenu('Categories', {}, {icon: 'menu'});
      expect(menu.expandable).to.be.true;
      expect(menu.priority).to.eq(20);
      expect(menu.icon).to.eq('menu');
    });

    it('# should priority can be change when pass', function() {
      let menu = menuUtil.convertExpandableMenu('Categories', {}, {priority: 5});
      expect(menu.expandable).to.be.true;
      expect(menu.priority).to.eq(5);
    });

    it('# should fail when no pass', function() {
      let menu = menuUtil.convertExpandableMenu('Categories', {});
      expect(menu.expandable).to.be.true;
      expect(menu.priority).to.eq(20);
      expect(menu.icon).to.eq('link');
    });
  });

  describe('menu-util:convertDirectMenu', function() {
    it('# should icon to be link and priority to be 20 when pass empty object as option', function() {
      let menu = menuUtil.convertDirectMenu('Tags', '', {});
      expect(menu.expandable).to.be.false;
      expect(menu.priority).to.eq(20);
      expect(menu.icon).to.eq('link');
    });

    it('# should icon can be change when pass', function() {
      let menu = menuUtil.convertDirectMenu('Tags', '', {icon: 'menu'});
      expect(menu.expandable).to.be.false;
      expect(menu.priority).to.eq(20);
      expect(menu.icon).to.eq('menu');
    });

    it('# should priority can be change when pass', function() {
      let menu = menuUtil.convertDirectMenu('Tags', '', {priority: 5});
      expect(menu.expandable).to.be.false;
      expect(menu.priority).to.eq(5);
    });

    it('# should fail when no pass', function() {
      let menu = menuUtil.convertDirectMenu('Tags', '');
      expect(menu.expandable).to.be.false;
      expect(menu.priority).to.eq(20);
      expect(menu.icon).to.eq('link');
    });

  });
});
