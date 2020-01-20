import React, { PureComponent } from 'react';

import awsCertSa from '../assets/aws-certified-sa.png'
import awsCertDev from '../assets/aws-certified-dev.png'

import { Col } from 'antd';

import College from './education/College'

class Education extends PureComponent {
  render() {
    let { width } = this.props

    let awsCertSaElement = (
      <div className="aws-cert-badge-wrapper">
        <a href="https://www.certmetrics.com/amazon/public/badge.aspx?i=1&t=c&d=2018-09-10&ci=AWS00599591" target="_blank">
          <img className="aws-cert-badge" src={awsCertSa} />
        </a>
      </div>
    )

    let awsCertDevElement = (
      <div className="aws-cert-badge-wrapper">
        <a href="https://www.certmetrics.com/amazon/public/badge.aspx?i=2&t=c&d=2019-02-06&ci=AWS00599591" target="_blank">
          <img className="aws-cert-badge" src={awsCertDev} />
        </a>
      </div>
    )

    return (
      <div className="education-section">
        <Col span={24}>
          <College width={width} />
        </Col>
        <Col span={12}>
          {awsCertSaElement}
        </Col>
        <Col span={12}>
          {awsCertDevElement}
        </Col>
      </div>
    );
  }
}

export default Education
