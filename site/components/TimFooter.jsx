import React, { PureComponent } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

class TimFooter extends PureComponent {
  render() {
    return (
      <Footer className="footer">©2020 Tim Becker, All rights reserved</Footer>
    );
  }
}

export default TimFooter

