import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import Profile from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('@theme/r-material: core/components: Profile', (): void => {
  it('# should mount profile component correctly', (): void => {
    const mockProfileProps = {
      name: '',
      avatar: 'https://img.aquariuslt.com/social/avatar.png',
      subtitle: '',
      description: ''
    };

    const wrapper = Enzyme.shallow(<Profile {...mockProfileProps} />);

    expect(wrapper).toMatchSnapshot();
  });
});
