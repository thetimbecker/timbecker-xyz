import React, { PureComponent } from 'react';
import { Card, Col } from 'antd';

class Section extends PureComponent {
  render() {
    let { children, cardKey, skinny } = this.props

    return (
      <Col span={skinny ? 24 : 12}>
        <Card
          key={cardKey}
          className="section-card"
        >
          {children}
        </Card>
      </Col>
    );
  }
}

export default Section
