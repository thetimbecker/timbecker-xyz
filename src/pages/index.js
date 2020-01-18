
import React, { PureComponent } from 'react';
import { Layout, Menu, PageHeader, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;

class Index extends PureComponent {
  render() {
    return (
      <Layout className="layout">
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
              >
                <Menu.Item key="resume">Resume</Menu.Item>
                <Menu.Item key="visitor-info">Visitor Info</Menu.Item>
                <Menu.Item key="site-architecture">Site Architecture</Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Content className="content-wrapper">
            <div>Content</div>
        </Content>
        <Footer className="footer">©2020 Tim Becker, All rights reserved</Footer>
      </Layout>
    );
  }
}

export default Index

