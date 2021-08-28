import React, { PureComponent } from 'react';

import { Col } from 'antd';

import Languages from './skills/Languages'
import Technologies from './skills/Technologies'
import Methodologies from './skills/Methodologies'
import SoftSkills from './skills/SoftSkills'

class Skills extends PureComponent {
  render() {
    let { skinny } = this.props

    if (skinny) {
      return (
        <div>
          <Col span={24}>
            <Languages />
            <Technologies />
            <Methodologies />
            <SoftSkills />
          </Col>
        </div>
      );
    } else {
      return (
        <div>
          <Col span={12}>
            <Languages />
            <Methodologies />
          </Col>
          <Col span={12}>
            <Technologies />
            <SoftSkills />
          </Col>
        </div>
      );
    }
  }
}

export default Skills
