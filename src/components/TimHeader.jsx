import React, { PureComponent } from 'react';
import { Layout, Menu, PageHeader, Row, Col, Affix } from 'antd';

const { Header } = Layout;

class TimHeader extends PureComponent {
  // https://stackoverflow.com/a/442474/8474056
  getOffset = el => {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: _y, left: _x };
  }

  scrollToElementById = id => {
    let offset = this.getOffset(document.getElementById(id))
    window.scroll({top: offset.top, left: offset.left, behavior: 'smooth' })
  }

  render() {
    let navItems = this.props.sections

    return (
      <Affix>
        <Header className="header">
          <Row type="flex" justify="space-between">
            <Col span={16}>
              <PageHeader
                title="TIM BECKER"
                subTitle="DevOps Engineer"
              />
            </Col>
            <Col span={8}>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['resume']}
                className="nav-menu"
                onSelect={item => this.scrollToElementById(item.key)}
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
