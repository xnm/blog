import _ from 'lodash';
import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import Menu from 'antd/es/menu/index';
import MenuItem from 'antd/es/menu/MenuItem';
import Icon from 'antd/es/icon/index';

class AppSider extends React.Component {
  static defaultProps = {
    menus: [
      {
        title: 'Home',
        icon: 'home',
        path: '/'
      },
      {
        title: 'Not Found',
        icon: 'question',
        path: '/404'
      }
    ]
  };

  state = {
    collapsed: false
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let $this = this;
    $this.loadMenus();
  }

  /* fetch menus api and load into store */
  loadMenus() {

  }

  onCollapse = (collapsed) => {
    let $this = this;
    $this.setState({collapsed});
  };

  renderMenus() {
    let $this = this;

    const menus = $this.props.menus;

    return _.map(menus, (menu) => {
      return (
        <MenuItem
          key={menu.path}
        >
          <NavLink to={menu.path}>
            <Icon type={menu.icon}/>
            <span>{menu.title}</span>
          </NavLink>
        </MenuItem>
      );
    });
  }

  render() {
    let $this = this;
    const {location} = $this.props;
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          selectedKeys={[location.pathname]}
        >
          {this.renderMenus()}
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(AppSider);

