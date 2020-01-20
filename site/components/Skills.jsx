import React, { PureComponent } from 'react';

import { Col } from 'antd';

import Languages from './skills/Languages'
import EverythingAsCode from './skills/EverythingAsCode'
import OtherTechnologies from './skills/OtherTechnologies'
import DevOpsMethodologies from './skills/DevOpsMethodologies'

class Skills extends PureComponent {
  render() {
    let { skinny } = this.props

    if (skinny) {
      return (
        <div>
          <Col span={24}>
            <Languages />
            <EverythingAsCode />
            <OtherTechnologies />
            <DevOpsMethodologies />
          </Col>
        </div>
      );
    } else {
      return (
        <div>
          <Col span={12}>
            <Languages />
            <DevOpsMethodologies />
          </Col>
          <Col span={12}>
            <EverythingAsCode />
            <OtherTechnologies />
          </Col>
        </div>
      );
    }
  }
}

export default Skills
