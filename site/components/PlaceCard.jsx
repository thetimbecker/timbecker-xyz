import React, { PureComponent } from 'react';
import { Card, Col, Row } from 'antd';


class PlaceCard extends PureComponent {
  render() {
    let { logo, content, skinny, superSkinny } = this.props

    if (superSkinny) {
      return (
        <Card className="section-card">
          <div style={{textAlign: "center"}}>
            {logo}
            {content}
          </div>
        </Card>
      );
    } else if (skinny) {
      return (
        <Card className="section-card">
          <Row type="flex" gutter={16} align="middle">
            <Col>
              {logo}
            </Col>
            <Col>
              {content}
            </Col>
          </Row>
        </Card>
      );
    } else {
      return (
        <Card
          className="section-card"
          style={{width: "82%", marginLeft: "auto", marginRight: "auto"}}
        >
          <Row type="flex" gutter={16} align="middle">
            <Col>
              {logo}
            </Col>
            <Col>
              {content}
            </Col>
          </Row>
        </Card>
      );
    }
  }
}

export default PlaceCard
