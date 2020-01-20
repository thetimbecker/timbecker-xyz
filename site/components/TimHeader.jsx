import React, { PureComponent } from 'react';
import { Layout, Menu, PageHeader, Row, Col, Affix } from 'antd';

const { Header } = Layout;

import scrollToElementById from '../utils/scrollToElementById'

class TimHeader extends PureComponent {
  render() {
    let navItems = this.props.sections

    return (
      <Affix>
        <Header className="header">
          <Row type="flex" justify="space-between" className="header-row">
            <Col span={12} className="header-col">
              <a href="https://timbecker.xyz" className="header-title">TIM BECKER</a>
            </Col>
            <Col span={12} className="header-col">
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[]}
                className="nav-menu"
                onClick={item => scrollToElementById(item.key)}
              >
                {navItems.map(n => <Menu.Item key={n.key}>{n.title}</Menu.Item>)}
              </Menu>
            </Col>
          </Row>
        </Header>
      </Affix>
    );
  }
}

export default TimHeader
