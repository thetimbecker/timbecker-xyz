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
              <div className="header-title">TIM BECKER</div>
            </Col>
            <Col span={12} className="header-col">
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['resume']}
                className="nav-menu"
                onSelect={item => scrollToElementById(item.key)}
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
