import React, { PureComponent } from 'react';
import { Divider, Card, Row, Col } from 'antd';

class Section extends PureComponent {
  render() {
    let { children, sectionKey, title } = this.props

    if (sectionKey === 'home') {
      return (
        <div className="section" key={sectionKey}>
            {children}
        </div>
      );
    } else {
      return (
        <div className="section" key={sectionKey}>
          <Divider style={{fontSize: 24}} id={sectionKey} orientation="center">
            {title}
          </Divider>
          <div className="section-content">
            {children}
          </div>
        </div>
      );
    }
  }
}

export default Section
