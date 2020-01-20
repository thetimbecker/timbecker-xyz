import React, { PureComponent } from 'react';

import vandyLogo from '../../assets/vandy.jpg'

import { Row, Col } from 'antd';

import TimCard from '../TimCard';

class College extends PureComponent {
  render() {
    let vandyLogoElement = <img style={{height: 256, width: 256}} src={vandyLogo} />

    let vandyDetails = (
      <div>
        <div className="where">Vanderbilt University</div>
        <div className="what">B.S. in Computer Science and Mathematics</div>
        <div className="when">2013 - 2017</div>
        <div>Earned Academic Achievement while studying abroad in Australia</div>
        <div>Minored in Psychology</div>
      </div>
    )

    if (this.props.width < 850) {
      return (
        <TimCard>
          <div style={{textAlign: "center"}}>
            {vandyLogoElement}
            {vandyDetails}
          </div>
        </TimCard>
      );
    } else if (this.props.width < 1000) {
      return (
        <TimCard>
          <Row type="flex" gutter={16} align="middle">
            <Col>
              {vandyLogoElement}
            </Col>
            <Col>
              {vandyDetails}
            </Col>
          </Row>
        </TimCard>
      );
    } else {
      return (
        <TimCard style={{width: "82%", marginLeft: "auto", marginRight: "auto"}}>
          <Row type="flex" gutter={16} align="middle">
            <Col>
              {vandyLogoElement}
            </Col>
            <Col>
              {vandyDetails}
            </Col>
          </Row>
        </TimCard>
      );
    }
  }
}

export default College

