import React, { PureComponent } from 'react';

import { Icon } from 'antd';

import TimCard from '../TimCard';

class SoftSkills extends PureComponent {
  render() {
    return (
      <TimCard
        title="Soft Skills"
        // description="Hard core."
        description="I'm not just an engineer, I'm a human too!"
        avatar={<Icon type="team" />}
        gridItems={["Coaching", "Asynchronous communication", "Task management and planning", "Cross team collaboration"]}
      >
      </TimCard>
    );
  }
}

export default SoftSkills

