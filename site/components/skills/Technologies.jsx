import React, { PureComponent } from 'react';

import { Icon } from 'antd';

import TimCard from '../TimCard';

class Technologies extends PureComponent {
  render() {
    return (
      <TimCard
        title="Technologies"
        description="These don't fit as nicely in the other categories."
        avatar={<Icon type="tool" />}
        gridItems={["Terraform", "AWS", "Docker", "Linux", "SQL", "Spark, Parquet, Hive"]}
      >
      </TimCard>
    );
  }
}

export default Technologies

