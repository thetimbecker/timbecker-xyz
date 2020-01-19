import React, { PureComponent } from 'react';
import { Divider, Card, Row, Col } from 'antd';

class Section extends PureComponent {
  render() {
    let { children, sectionKey, title, skinny } = this.props

    let cards = children.map(child =>
      <Col span={skinny ? 24 : 12}>
        <Card
          key={sectionKey}
          className="section-card"
        >
          {child}
        </Card>
      </Col>
    )

    return (
      <div className="section" key={sectionKey}>
        <Divider id={sectionKey} orientation="center">
          {title}
        </Divider>
        <div className="section-content">
          {cards}
        </div>
      </div>
    );
  }
}

export default Section
