import * as React from 'react';
import { render } from 'react-testing-library';

import Navigation from '../';


describe('@theme/r-material: core/components: Navigation', (): void => {
  it('# should mount Navigation with props.title correctly', (): void => {

    const mockTitle = 'title';
    const container = render(<Navigation title={mockTitle}/>);

    expect(container).toMatchSnapshot();
  });
});
