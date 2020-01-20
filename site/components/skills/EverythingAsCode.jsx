import React, { PureComponent } from 'react';

import { Icon } from 'antd';

import TimCard from '../TimCard';

class EverythingAsCode extends PureComponent {
  render() {
    return (
      <TimCard
        title="Everything as Code"
        description="I don't like doing things more than twice. If I do, I automate it."
        avatar={<Icon type="snippets" />}
        gridItems={["Terraform", "Ansible", "Packer", "Jenkins Pipeline as Code"]}
      >
      </TimCard>
    );
  }
}

export default EverythingAsCode

