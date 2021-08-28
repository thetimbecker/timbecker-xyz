import React, { PureComponent } from 'react';

import { Col } from 'antd';

import BelleseDevOps from './experience/BelleseDevOps'
import BelleseFullStack from './experience/BelleseFullStack'
import BBVACloudGov from './experience/BBVACloudGov'
import BBVADevOps from './experience/BBVADevOps'
import TicketBiscuit from './experience/TicketBiscuit'

class Experience extends PureComponent {
  render() {
    let { skinny, superSkinny } = this.props

    return (
      <div className="experience-section">
        <Col>
          <BelleseDevOps skinny={skinny} superSkinny={superSkinny} />
          <BelleseFullStack skinny={skinny} superSkinny={superSkinny} />
          <BBVACloudGov skinny={skinny} superSkinny={superSkinny} />
          <BBVADevOps skinny={skinny} superSkinny={superSkinny} />
          <TicketBiscuit skinny={skinny} superSkinny={superSkinny} />
        </Col>
      </div>
    );
  }
}

export default Experience
