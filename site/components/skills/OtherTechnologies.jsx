import React, { PureComponent } from 'react';

import { Icon } from 'antd';

import TimCard from '../TimCard';

class OtherTechnologies extends PureComponent {
  render() {
    return (
      <TimCard
        title="Other Technologies"
        description="These didn't fit as nicely in the other categories."
        avatar={<Icon type="tool" />}
        gridItems={["AWS", "Docker", "Kubernetes", "Linux (CentOS and Alpine)", "SQL", "NoSQL"]}
      >
      </TimCard>
    );
  }
}

export default OtherTechnologies

