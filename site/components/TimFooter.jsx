import React, { PureComponent } from 'react';
import { Layout, Button } from 'antd';

const { Footer } = Layout;

class TimFooter extends PureComponent {
  render() {
    return (
      <Footer className="footer">
        <div>©2021 Tim Becker, All rights reserved</div>
        <div>I made the first version of this this site in one weekend! Check out the <a href="https://github.com/thetimbecker/timbecker-xyz/tree/v1.0.0" target="_blank">source code</a>.</div>
        <div className="footer-buttons">
          <Button shape="circle" icon="linkedin" size="large" href="https://www.linkedin.com/in/thetimbecker/" target="_blank" />
          <Button shape="circle" icon="github" size="large" href="https://github.com/thetimbecker" target="_blank" />
        </div>
      </Footer>
    );
  }
}

export default TimFooter

