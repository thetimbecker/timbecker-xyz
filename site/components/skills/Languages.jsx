import React, { PureComponent } from 'react';

import { Icon } from 'antd';

import TimCard from '../TimCard';

class Languages extends PureComponent {
  render() {
    return (
      <TimCard
        title="Languages"
        description="Can't find these on Duolingo."
        avatar={<Icon type="code" />}
        gridItems={["JavaScript (React)", "Java (Maven)", "Python", "Groovy", "Bash", "Fish Shell"]}
      >
      </TimCard>
    );
  }
}

export default Languages

