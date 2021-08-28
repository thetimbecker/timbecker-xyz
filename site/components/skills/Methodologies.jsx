import React, { PureComponent } from 'react';

import { Icon } from 'antd';

import TimCard from '../TimCard';

class Methodologies extends PureComponent {
  render() {
    return (
      <TimCard
        title="Methodologies"
        description="Not only do I know these buzz words, I know how to put them into practice."
        avatar={<Icon type="bulb" />}
        gridItems={["CI/CD", "Git workflows", "ETL", "Continuous Monitoring", "Microservice Architecture", "Serverless Architecture"]}
      >
      </TimCard>
    );
  }
}

export default Methodologies

