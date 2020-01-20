import React, { PureComponent } from 'react';

import { Icon } from 'antd';

import TimCard from '../TimCard';

class OtherTechnologies extends PureComponent {
  render() {
    return (
      <TimCard
        title="Other Technologies"
        description="These didn't fit as nicely in the categories above, but I'm good at them too."
        avatar={<Icon type="tool" />}
        gridItems={["AWS", "Docker", "Kubernetes", "SQL", "NoSQL", "Linux (CentOS and Alpine)"]}
      >
      </TimCard>
    );
  }
}

export default OtherTechnologies

