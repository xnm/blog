import * as React from 'react';
import { mount } from 'enzyme';

import { Provider } from 'mobx-react';
import App from '../src/App';
import navigationStore from '../src/core/stores/navigation.store';

describe('@theme/r-material:App', (): void => {
  it('# should mount App with empty route correctly', (): void => {
    const router = [];
    const wrapper = mount(<App router={router} navigationStore={navigationStore} />);

    expect(wrapper.props().router).toEqual([]);
  });

  it('# should mount App with 1 route correctly', (): void => {
    const FixtureComponent = (): JSX.Element => <div>Fixture</div>;

    const router = [
      {
        path: '/',
        component: FixtureComponent
      }
    ];

    const wrapper = mount(<App router={router} navigationStore={navigationStore} />);
    expect(wrapper.props().router).toHaveLength(1);
  });

  it('# should mount App with injected store', (): void => {
    const FixtureComponent = (): JSX.Element => <div>Fixture</div>;

    const router = [
      {
        path: '/',
        component: FixtureComponent
      }
    ];

    mount(
      <Provider navigationStore={navigationStore}>
        <App router={router} />
      </Provider>
    );
  });

  it('# should mount App without injected store', (): void => {
    const FixtureComponent = (): JSX.Element => <div>Fixture</div>;

    const router = [
      {
        path: '/',
        component: FixtureComponent
      }
    ];

    mount(
      <Provider navigationStore={undefined}>
        <App router={router} />
      </Provider>
    );
  });
});
