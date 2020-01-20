import React, { PureComponent } from 'react';

import { Icon } from 'antd';

import TimCard from '../TimCard';

class DevOpsMethodologies extends PureComponent {
  render() {
    return (
      <TimCard
        title="DevOps Methodologies"
        description="Not only do I know these buzz words, I know how to put them into practice."
        avatar={<Icon type="bulb" />}
        gridItems={["CI/CD", "GitFlow", "Zero Downtime Deployments", "Microservice Architecture"]}
      >
      </TimCard>
    );
  }
}

export default DevOpsMethodologies

