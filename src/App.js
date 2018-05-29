import './assets/css/app.less';
import React from 'react';
import Layout from 'antd/es/layout/layout';

import Routes from '@/routes';
import AppSider from '@/core/components/AppSider';

const {Header, Footer, Content} = Layout;

class App extends React.Component {

  render() {
    return (
      <Layout className="app-layout">
        <AppSider/>
        <Layout>
          <Header>Header</Header>
          <Content className="app-content">
            <Routes/>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
