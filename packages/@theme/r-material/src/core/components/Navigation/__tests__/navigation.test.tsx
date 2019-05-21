import * as React from 'react';

import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import Navigation from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('@theme/r-material: core/components: Navigation', (): void => {
  it('# should mount Navigation with props.title correctly', (): void => {

    const mockTitle = 'title';
    const wrapper = Enzyme.shallow(<Navigation title={mockTitle}/>);

    expect(wrapper).toMatchSnapshot();
  });


  it('# should show SideBar when state.open is true', (): void => {
    const mockTitle = 'title';

    let wrapper = Enzyme.shallow(<Navigation title={mockTitle}/>);

    // simulate on drawer button will trigger sidebar class change
    wrapper.find('[aria-label="Open drawer"]').simulate('click');

    expect(wrapper).toMatchSnapshot();
  });

  it('# should show SideBar when click twice menu', (): void => {
    const mockTitle = 'title';

    let wrapper = Enzyme.shallow(<Navigation title={mockTitle}/>);

    // simulate on drawer button will trigger sidebar class change
    wrapper.find('[aria-label="Open drawer"]').simulate('click');

    wrapper.find('[aria-label="Close drawer"]').simulate('click');

  });
});
